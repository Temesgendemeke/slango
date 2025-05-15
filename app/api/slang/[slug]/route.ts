import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { db } from "@/lib/prisma";

export async function GET(request: Request, {params}) {
  const { slug } = await params;
  try {
    const slang = await db.slang.findUnique({
      where: { slug },
    });
    if (!slang) {
      return NextResponse.json({ message: "slug not found" }, { status: 404 });
    }
    return NextResponse.json(slang);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", detail: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextApiRequest, { params }) {
  const id = params.id;

  try {
    await db.slang.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Delete successfuly" });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.meta?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
