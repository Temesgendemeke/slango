import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const userWithCounts = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
        posts: {
          include: {
            _count: {
              select: { bookmarked_by: true, views: true},

            },
          },
        },
        _count: {
          select: { posts: true },
        },
      },
    });




    return NextResponse.json(userWithCounts);
  } catch (error) {
    return NextResponse.json(
      {
        message: "An unexpected error occurred while fetching the user.",
        error,
      },
      { status: 500 }
    );
  }
}
