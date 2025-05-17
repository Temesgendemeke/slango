import { db } from "@/lib/prisma";

// like logic

export async function POST(request) {
  const data = await request.body();

  const liked_already = await db.like.findUnique({
    where: {
      slang_id_user_id: {
        slang_id: data.slang_id,
        user_id: data.user_id,
      },
    },
  });

  if (liked_already) {
    await db.like.delete({
      where: {
        slang_id_user_id: {
          slang_id: data.slang_id,
          user_id: data.user_id,
        },
      },
    });
    return { liked: false };
  }

  await db.like.create({
    data: {
      liked_by: { connect: data.user_id },
      slang: { connect: data.slang_id },
    },
  });
  return { liked: true };
}
