import { db } from "@/lib/prisma";
import { updateUser } from "better-auth/api";
import { NextResponse } from "next/server";

export async function GET(params: type) {
  return NextResponse.json({});
}

export async function POST(request, params: { username: string }) {
  const {username} = await params;
  const body = await request.body();

  await db.user.update({
    where: {
      username: username,
    },
    data: {
      username: body.new_username,
    },
  });

  return NextResponse.json({});
}
