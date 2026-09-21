import { NextRequest, NextResponse } from "next/server";
import { eq, desc, and, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const conditions = [eq(blogPosts.status, "Published")];

    if (category && category !== "all" && category !== "All") {
      conditions.push(eq(blogPosts.category, category));
    }

    if (featured === "true") {
      conditions.push(eq(blogPosts.featured, true));
    }

    if (search) {
      const searchPattern = `%${search}%`;
      conditions.push(
        or(
          ilike(blogPosts.title, searchPattern),
          ilike(blogPosts.excerpt, searchPattern)
        )!
      );
    }

    const whereClause = and(...conditions);

    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(whereClause);

    const total = Number(totalResult[0]?.count || 0);
    const totalPages = Math.ceil(total / limit) || 1;
    const offset = (page - 1) * limit;

    const posts = await db
      .select()
      .from(blogPosts)
      .where(whereClause)
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      success: true,
      posts,
      total,
      page,
      totalPages,
    });
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
