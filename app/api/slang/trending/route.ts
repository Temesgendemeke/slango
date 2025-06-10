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
      take: 5,
    });

    return NextResponse.json(slangs);
  } catch {
    return NextResponse.json(
      { error: "failed to fetch slangs" },
      { status: 500 }
    );
  }
}
