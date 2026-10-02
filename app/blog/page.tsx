import { db } from "@/db";
import { blogPosts as blogPostsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { blogPosts as defaultBlogPosts, BlogPost } from "@/lib/blog-data";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "News & Articles | Sundarban Luxury Package",
  description:
    "Wildlife stories, travel guides, culture & ecology from the heart of Sundarban.",
};

export default async function BlogListPage() {
  let posts: BlogPost[] = [];

  try {
    const dbPosts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, "Published"))
      .orderBy(desc(blogPostsTable.createdAt));

    if (dbPosts && dbPosts.length > 0) {
      posts = dbPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || p.title,
        content: p.content,
        image: p.image || "",
        category: p.category || "Wildlife",
        date: p.date || "Today",
        readTime: p.readTime || "4 Min Read",
        author: p.author || "Arjun Chowdhury",
        authorImage: p.authorImage || "",
        tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
        status: (p.status as "Published" | "Draft" | "Scheduled") || "Published",
        featured: p.featured ?? false,
        metaTitle: p.metaTitle ?? undefined,
        metaDescription: p.metaDescription ?? undefined,
        views: p.views ?? 0,
      }));
    }
  } catch (error) {
    console.error("Error fetching blog posts for blog listing:", error);
  }

  // Graceful fallback to default posts if DB query returns empty
  if (posts.length === 0) {
    posts = defaultBlogPosts;
  }

  return <BlogListClient initialPosts={posts} />;
}
