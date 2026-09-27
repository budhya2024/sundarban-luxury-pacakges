import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { pageContents } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { initialAdminPages } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pages = await db.select().from(pageContents);
    return NextResponse.json({
      success: true,
      pages: pages.length > 0 ? pages : initialAdminPages,
    });
  } catch (error: any) {
    console.error("Admin get pages error:", error);
    return NextResponse.json({
      success: true,
      pages: initialAdminPages,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { pageKey, heroTitle, heroSubtitle, heroBadge, heroBackgroundImage, metaDescription, sections, customData } = body;

    if (!pageKey) {
      return NextResponse.json({ error: "pageKey is required" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(pageContents)
      .where(eq(pageContents.pageKey, pageKey))
      .limit(1);

    const updateFields: any = {
      updatedAt: new Date(),
    };
    if (heroTitle !== undefined) updateFields.heroTitle = heroTitle;
    if (heroSubtitle !== undefined) updateFields.heroSubtitle = heroSubtitle;
    if (heroBadge !== undefined) updateFields.heroBadge = heroBadge;
    if (heroBackgroundImage !== undefined) updateFields.heroBackgroundImage = heroBackgroundImage;
    if (metaDescription !== undefined) updateFields.metaDescription = metaDescription;
    if (sections !== undefined) updateFields.sections = sections;
    if (customData !== undefined) updateFields.customData = customData;

    if (existing.length === 0) {
      const fallback = initialAdminPages.find((p) => p.pageKey === pageKey);
      await db.insert(pageContents).values({
        pageKey,
        pageName: fallback?.pageName || pageKey,
        pageRoute: fallback?.pageRoute || `/${pageKey}`,
        heroTitle: heroTitle || fallback?.heroTitle || "Sundarban Luxury",
        heroSubtitle: heroSubtitle ?? fallback?.heroSubtitle ?? "",
        heroBadge: heroBadge ?? fallback?.heroBadge ?? "",
        heroBackgroundImage: heroBackgroundImage ?? fallback?.heroBackgroundImage ?? "",
        metaDescription: metaDescription ?? fallback?.metaDescription ?? "",
        sections: sections || fallback?.sections || [],
        customData: customData || {},
        updatedAt: new Date(),
      });
    } else {
      await db
        .update(pageContents)
        .set(updateFields)
        .where(eq(pageContents.pageKey, pageKey));
    }

    const [updated] = await db
      .select()
      .from(pageContents)
      .where(eq(pageContents.pageKey, pageKey))
      .limit(1);

    return NextResponse.json({
      success: true,
      page: updated,
      message: "Page content saved successfully",
    });
  } catch (error: any) {
    console.error("Admin update page error:", error);
    return NextResponse.json(
      { error: "Failed to update page content" },
      { status: 500 }
    );
  }
}
