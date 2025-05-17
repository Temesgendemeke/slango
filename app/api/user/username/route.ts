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
        slang: {
          include: {
            posted_by: true,
            _count: {
              select: { like: true },
            },
          },
        },
        _count: {
          select: { slang: true },
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
