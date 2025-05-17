import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import generate_unique_slug from "@/utils/generate_unique";

export async function GET() {
  try {
    console.log("slangs");

    const slangs = await db.slang.findMany({
      include: {
        posted_by: true,
        _count: {
          select: { like: true },
        },
      },
    });

    const result = slangs.map((slang) => ({
      ...slang,
      like_count: slang._count.like,
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch slangs", message: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = await generate_unique_slug(body.name);

    const newSlang = await db.slang.create({
      data: { ...body, slug },
    });
    return NextResponse.json(newSlang, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create slang", message: error },

      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json();

  try {
    const { id, ...updateData } = body;
    const updated_slang = await db.slang.update({
      where: {
        id: id,
      },
      data: { ...updateData },
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
