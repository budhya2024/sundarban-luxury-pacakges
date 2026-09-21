import { NextRequest, NextResponse } from "next/server";
import { eq, and, not, desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const posts = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "Published")))
      .limit(1);

    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = posts[0];

    // Increment views in background
    try {
      await db
        .update(blogPosts)
        .set({ views: sql`${blogPosts.views} + 1` })
        .where(eq(blogPosts.id, post.id));
    } catch {
      // Non-blocking
    }

    // Get 3 related posts from same category or recent
    const relatedPosts = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.category, post.category),
          not(eq(blogPosts.id, post.id)),
          eq(blogPosts.status, "Published")
        )
      )
      .orderBy(desc(blogPosts.createdAt))
      .limit(3);

    // Get 4 recent posts
    const recentPosts = await db
      .select({
        slug: blogPosts.slug,
        title: blogPosts.title,
        date: blogPosts.date,
        image: blogPosts.image,
      })
      .from(blogPosts)
      .where(and(eq(blogPosts.status, "Published"), not(eq(blogPosts.id, post.id))))
      .orderBy(desc(blogPosts.createdAt))
      .limit(4);

    return NextResponse.json({
      success: true,
      post,
      relatedPosts,
      recentPosts,
    });
  } catch (error: any) {
    console.error("Error fetching single blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
