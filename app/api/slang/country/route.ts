import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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
    });

    const posts = slangs.reduce((acc, post) => {
      const country = post.country;
      if (!country) {
        return acc;
      }
      if (!acc[country]) {
        acc[country] = [];
      }
      if (acc[country].length <= 5) {
        acc[country].push(post);
      }
      if (Object.keys(acc).length < 3) {
        return acc;
      }
      return acc;
    }, {});

   

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch slangs" },
      { status: 500 }
    );
  }
}
