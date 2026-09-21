import { NextRequest, NextResponse } from "next/server";
import { asc, desc, eq, and } from "drizzle-orm";
import { db } from "@/db";
import { tourPackages } from "@/db/schema";
import { initialAdminPackages } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "createdAt_asc";
    const status = searchParams.get("status") || "Active";
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const limitParam = searchParams.get("limit");

    // Build conditions
    const conditions = [];
    if (status && status !== "all") {
      conditions.push(eq(tourPackages.status, status));
    }
    if (featured === "true") {
      conditions.push(eq(tourPackages.featured, true));
    }
    if (category) {
      conditions.push(eq(tourPackages.category, category));
    }

    // Determine sorting order
    let orderByClause;
    switch (sort) {
      case "createdAt_asc":
      case "created_asc":
        orderByClause = asc(tourPackages.createdAt);
        break;
      case "createdAt_desc":
      case "created_desc":
        orderByClause = desc(tourPackages.createdAt);
        break;
      case "price_asc":
        orderByClause = asc(tourPackages.price);
        break;
      case "price_desc":
        orderByClause = desc(tourPackages.price);
        break;
      default:
        orderByClause = asc(tourPackages.createdAt);
    }

    let query = db
      .select()
      .from(tourPackages)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(orderByClause);

    if (limitParam) {
      const limitNum = parseInt(limitParam, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum) as any;
      }
    }

    const packages = await query;

    return NextResponse.json({
      success: true,
      packages: packages.length > 0 ? packages : initialAdminPackages,
    });
  } catch (error: any) {
    console.error("Error fetching tour packages:", error);
    // Graceful fallback to static initial packages
    return NextResponse.json({
      success: true,
      packages: initialAdminPackages,
      fallback: true,
    });
  }
}
