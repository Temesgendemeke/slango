import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  const { code } = await params;
  const url = new URL(request.url);
  const current_page = parseInt(url.searchParams.get("page")) || 1;
  const prePage = parseInt(url.searchParams.get("prepage")) || 10;

  try {
    const posts = await db.slang.findMany({
      where: {
        country: code.toUpperCase(),
      },
      include: {
        posted_by: true,
        _count: {
          select: {
            views: true,
          },
        },
      },
      skip: (current_page - 1) * prePage,
      take: prePage,
    });

    const total_post = await db.slang.count({
      where: {
        country: code,
      },
    });
    const total_pages = Math.ceil(total_post / prePage);

    if (!posts.length) return NextResponse.json({}, { status: 404 });
    return NextResponse.json({ total_pages, posts });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch slangs for the specified country." },
      { status: 500 }
    );
  }
}
