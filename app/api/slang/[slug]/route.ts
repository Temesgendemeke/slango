import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request: Request, { params }) {
  const { slug } = await params;

  try {
    const slang = await db.slang.findUnique({
      where: { slug },

      include: {
        posted_by: true,
        bookmarked_by: true,
        views: true,
        _count: {
          select: {
            views: true,
          },
        },
      },
    });
    if (!slang) {
      return NextResponse.json({ message: "post not found" }, { status: 404 });
    }
    return NextResponse.json(slang);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", detail: error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }) {
  const body = await request.json();
  const { slug } = await params;

  try {
    const updated_slang = await db.slang.update({
      where: {
        slug,
      },
      data: { ...body },
    });
    return NextResponse.json({
      message: "Upated sucessfuly",
      slang: updated_slang,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update slang", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request | NextRequest, { params }) {
  const { slug } = await params;

  try {
    await db.slang.delete({
      where: {
        slug,
      },
    });
    return NextResponse.json({ message: "Delete successfuly" });
  } catch {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
