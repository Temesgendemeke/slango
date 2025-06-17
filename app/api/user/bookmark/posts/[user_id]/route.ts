import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }) {
  const { user_id } = await params;

  const posts = await db.bookmark.findMany({
    where: {
      user_id,
    },
    include: {
      Slang: {
        include: {
          _count: {
            select: {
              views: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(posts);
}
