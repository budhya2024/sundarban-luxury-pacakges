import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { blogPosts as defaultBlogPosts } from "@/lib/blog-data";
import { verifyAdminRequest } from "@/lib/auth";
import { deleteFromStorage } from "@/lib/s3";

export const dynamic = "force-dynamic";

// GET single post for Admin
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (posts.length === 0) {
      // Check fallback data
      const fallback = defaultBlogPosts.find((p) => p.slug === slug);
      if (fallback) {
        return NextResponse.json({ success: true, post: fallback });
      }
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: posts[0] });
  } catch (error: any) {
    console.error("Admin get single blog post error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT update post
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await req.json();

    const existing = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    let updatedPost: any = null;

    if (existing.length === 0) {
      // Post was not yet in DB; check fallback data and insert
      const fallback = defaultBlogPosts.find((p) => p.slug === slug);
      const [inserted] = await db
        .insert(blogPosts)
        .values({
          slug: body.slug || slug,
          title: body.title || fallback?.title || "Untitled",
          excerpt: body.excerpt || fallback?.excerpt || "",
          content: body.content || fallback?.content || "",
          image: body.image || fallback?.image || "",
          category: body.category || fallback?.category || "Wildlife",
          date: body.date || fallback?.date || "Today",
          readTime: body.readTime || fallback?.readTime || "4 Min Read",
          author: body.author || fallback?.author || "Arjun Chowdhury",
          authorImage: body.authorImage || fallback?.authorImage || "",
          tags: Array.isArray(body.tags) ? body.tags : fallback?.tags || ["Sundarban"],
          status: body.status || "Published",
          featured: body.featured !== undefined ? Boolean(body.featured) : false,
          metaTitle: body.metaTitle || body.title || fallback?.title || "",
          metaDescription: body.metaDescription || body.excerpt || fallback?.excerpt || "",
          views: 0,
        })
        .returning();
      updatedPost = inserted;
    } else {
      const current = existing[0];

      // If image has changed or removed, clean up old image from Neon storage
      if (
        body.image !== undefined &&
        body.image !== current.image &&
        current.image
      ) {
        deleteFromStorage(current.image).catch(() => {});
      }

      const updated = await db
        .update(blogPosts)
        .set({
          title: body.title !== undefined ? body.title : current.title,
          slug: body.slug !== undefined ? body.slug : current.slug,
          excerpt: body.excerpt !== undefined ? body.excerpt : current.excerpt,
          content: body.content !== undefined ? body.content : current.content,
          image: body.image !== undefined ? body.image : current.image,
          category: body.category !== undefined ? body.category : current.category,
          date: body.date !== undefined ? body.date : current.date,
          readTime: body.readTime !== undefined ? body.readTime : current.readTime,
          author: body.author !== undefined ? body.author : current.author,
          authorImage:
            body.authorImage !== undefined ? body.authorImage : current.authorImage,
          tags: Array.isArray(body.tags) ? body.tags : current.tags,
          status: body.status !== undefined ? body.status : current.status,
          featured: body.featured !== undefined ? Boolean(body.featured) : current.featured,
          metaTitle: body.metaTitle !== undefined ? body.metaTitle : current.metaTitle,
          metaDescription:
            body.metaDescription !== undefined
              ? body.metaDescription
              : current.metaDescription,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.slug, slug))
        .returning();

      updatedPost = updated[0];
    }

    // Revalidate public blog caches immediately so updates reflect instantly
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      if (body.slug && body.slug !== slug) {
        revalidatePath(`/blog/${body.slug}`);
      }
      revalidatePath("/");
      revalidatePath("/admin/blog");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error("Admin update blog post error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE post
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    // Retrieve post to clear associated images from Neon Object Storage
    const existing = await db
      .select({ image: blogPosts.image, content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existing.length > 0) {
      const post = existing[0];
      // 1. Delete cover image from storage
      if (post.image) {
        await deleteFromStorage(post.image);
      }
      // 2. Delete any inline markdown images from storage
      if (post.content) {
        const imageMatches = post.content.matchAll(/!\[.*?\]\((.*?)\)/g);
        for (const match of imageMatches) {
          const imgUrl = match[1];
          if (imgUrl) {
            await deleteFromStorage(imgUrl);
          }
        }
      }
    }

    await db.delete(blogPosts).where(eq(blogPosts.slug, slug));

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/");
      revalidatePath("/admin/blog");
    } catch {}

    return NextResponse.json({ success: true, message: "Post and associated storage files deleted" });
  } catch (error: any) {
    console.error("Admin delete blog post error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
