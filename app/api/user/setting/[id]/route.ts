import { db } from "@/lib/prisma";
import deleteImage from "@/utils/deleteImage";
import { NextRequest, NextResponse } from "next/server";
import { IdPagePropes } from "@/types/Props";

export async function GET(_request: NextRequest, { params }: IdPagePropes) {
  const { id } = await params;

  try {
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
      include: {
        image: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "failed to fetch user", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request | NextRequest,
  { params }: IdPagePropes
) {
  const { id } = await params;
  const image = await request.json();


  try {
    const current_image = await db.image.findFirst();
    if (current_image) {
      await deleteImage(current_image?.public_id);
    }

    await db.image.upsert({
      create: {
        id: "singleton",
        public_id: image.public_id as string,
        url: image.secure_url as string,
        user: {
          connect: { id: id },
        },
      },
      update: {
        public_id: image.public_id,
        url: image.secure_url,
      },
      where: {
        id: "singleton",
      },
    });

    return NextResponse.json({ message: "profile updated sucessfuly" });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
