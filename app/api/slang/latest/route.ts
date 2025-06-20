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
      createdAt: "desc", 
      },
      take: 5,
    });

    return NextResponse.json(slangs);
}
