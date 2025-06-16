import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const slangs = await db.slang.findMany({
      include: {
      posted_by: true,
      bookmarked_by: true,
      _count: {
        select: {
        views: true,
        },
      },
      },
      orderBy: {
      createdAt: "desc", // Change "asc" to "desc" to fetch latest posts
      },
      take: 5,
    });

    return NextResponse.json(slangs);
}
