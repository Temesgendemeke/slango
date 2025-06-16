import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { user_id } = await params;

  try {
    const bookmarked_posts = await db.bookmark.findMany({
      where: {
        user_id,
      },
      select: {
        slang_id: true,
      },
    });
    const slang_ids = bookmarked_posts.map((b) => b.slang_id);
    return NextResponse.json(slang_ids);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}
