import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const slangs = await db.slang.findMany({
      orderBy: "like",
    });

    return NextResponse.json(slangs);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch slangs" },
      { status: 500 }
    );
  }
}
