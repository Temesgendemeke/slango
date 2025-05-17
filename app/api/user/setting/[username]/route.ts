import { db } from "@/lib/prisma";
import deleteImage from "@/utils/deleteImage";
import { NextResponse } from "next/server";

export async function GET(params: type) {
  const { username } = await params;

  try {
    const user = await db.user.findFirst({
      where: {
        username: username,
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

export async function PUT(request, params: type) {
  const { username } = await params;
  const data = await request.body();
  const { image, user } = data;

  const current_image = await db.image.findFirst();

  try {
    await deleteImage(current_image.public_id);
    await db.image.upsert({
      create: {
        id: "singleton",
        public_id: image.public_id as string,
        url: image.secure_url as string,
        user: {
          connect: { id: user.id },
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

    await db.user.update({
      where: {
        username: username,
      },
      data: {
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });

    return NextResponse.json({ message: "profile updated sucessfuly" });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
