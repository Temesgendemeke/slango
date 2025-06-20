import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { subHours } from "date-fns";
import { isAuthenticated } from "@/lib/auth/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {
  const { post_id } = await params;
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const isAuth = await isAuthenticated();
  if ("error" in isAuth) return isAuth.error;

  if (!ip) {
    return NextResponse.json({ success: true });
  }

  const recentView = await db.views.findFirst({
    where: {
      post_id,
      ip,
      createdAt: { gte: subHours(new Date(), 24) },
    },
  });

  if (!recentView) {
    await db.views.create({
      data: {
        ip: ip,
        post_id,
      },
    });
  }

  return NextResponse.json({ success: true, recentView });
}
