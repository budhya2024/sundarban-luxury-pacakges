import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET all posts for Admin (including Drafts)
export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));

    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error("Admin get blog posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST create new post
export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      image,
      category,
      date,
      readTime,
      author,
      authorImage,
      tags,
      status,
      featured,
      metaTitle,
      metaDescription,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    let finalSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!finalSlug) {
      finalSlug = `post-${Date.now()}`;
    }

    // Check slug collision
    const existing = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, finalSlug))
      .limit(1);

    if (existing.length > 0) {
      finalSlug = `${finalSlug}-${Math.floor(100 + Math.random() * 900)}`;
    }

    const formattedDate =
      date ||
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    const [newPost] = await db
      .insert(blogPosts)
      .values({
        slug: finalSlug,
        title,
        excerpt: excerpt || title,
        content,
        image:
          image ||
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
        category: category || "Wildlife",
        date: formattedDate,
        readTime: readTime || "4 Min Read",
        author: author || "Arjun Chowdhury",
        authorImage:
          authorImage ||
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        tags: Array.isArray(tags) ? tags : [],
        status: status || "Published",
        featured: Boolean(featured),
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt || title,
        views: 0,
      })
      .returning();

    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    console.error("Admin create blog post error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}
