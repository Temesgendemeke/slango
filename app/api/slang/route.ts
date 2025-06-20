import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import generate_unique_slug from "@/utils/generate_unique";
import { isAuthenticated } from "@/lib/auth/auth";

export async function GET(request) {
  const url = new URL(request.url);
  const current_page = parseInt(url.searchParams.get("page")) || 1;
  const perpage = parseInt(url.searchParams.get("perpage")) || 10;

  try {
    const slangs = await db.slang.findMany({
      include: {
        posted_by: true,
        _count: {
          select: {
            views: true,
          },
        },
      },
      orderBy: {
        views: {
          _count: "desc",
        },
      },
      skip: (current_page - 1) * perpage,
      take: perpage,
    });

    const totalPosts = await db.slang.count();
    const totalPages = Math.ceil(totalPosts / perpage);

    return NextResponse.json({
      posts: slangs,
      total_page: totalPages,
      totalPosts,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch slangs", message: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAuth = await isAuthenticated();
  if ("error" in isAuth) return isAuth.error;

  
  try {
    const body = await request.json();
    const slug = await generate_unique_slug(body.name);

    const newSlang = await db.slang.create({
      data: { ...body, slug },
    });
    return NextResponse.json(newSlang, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create slang", message: error },

      { status: 500 }
    );
  }
}
