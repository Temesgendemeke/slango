import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
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

  console.log(posts);
  return NextResponse.json(posts);
}
