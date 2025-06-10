import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email } = await request.body;

  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "user is found" }, { status: 200 });
}
