import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IdPagePropes } from "@/types/Props";

export async function GET(_request: NextRequest, { params }: IdPagePropes) {
  const { id: user_id } = await params;

  const image = await db.image.findFirst({
    where: {
      user_id,
    },
  });

  return NextResponse.json(image);
}
