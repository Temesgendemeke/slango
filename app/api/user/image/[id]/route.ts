import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id: user_id } = await params;

  const image = await db.image.findFirst({
    where: {
      user_id,
    },
  });

  return NextResponse.json(image);
}
