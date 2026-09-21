import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tourPackages } from "@/db/schema";
import { initialAdminPackages } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const [pkg] = await db
      .select()
      .from(tourPackages)
      .where(eq(tourPackages.slug, slug))
      .limit(1);

    if (pkg) {
      return NextResponse.json({ success: true, package: pkg });
    }

    // Fallback to static packages
    const staticPkg = initialAdminPackages.find((p) => p.slug === slug);
    if (staticPkg) {
      return NextResponse.json({ success: true, package: staticPkg });
    }

    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  } catch (error: any) {
    console.error("Error fetching package by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch package details" },
      { status: 500 }
    );
  }
}
