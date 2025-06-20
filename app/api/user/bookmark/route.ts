import { isAuthenticated } from "@/lib/auth/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { user_id, post_id: slang_id } = await request.json();
  const isAuth = await isAuthenticated();
  if ("error" in isAuth) return isAuth.error;


  const existingBookmark = await db.bookmark.findUnique({
    where: {
      user_id_slang_id: {
        user_id,
        slang_id,
      },
    },
  });

  if (existingBookmark) {
    await db.bookmark.delete({
      where: {
        user_id_slang_id: {
          user_id,
          slang_id,
        },
      },
    });
    return NextResponse.json({ message: "Bookmark removed" }, { status: 200 });
  }
  const bookmark = await db.bookmark.create({
    data: {
      user_id,
      slang_id,
    },
  });
  
  return NextResponse.json(
    { bookmark, message: "Bookmark added" },
    { status: 201 }
  );
}
