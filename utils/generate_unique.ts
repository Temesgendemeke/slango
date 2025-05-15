import { db } from "@/lib/prisma";
import { slugify } from "./slugify";

const generate_unique_slug = async (name) => {
  const slug = slugify(name);
  let i = 1;
  let new_slug = slug;

  while (
    await db.slang.findUnique({
      where: {
        slug: new_slug,
      },
    })
  ) {
    new_slug = `${slug}${i++}`;
  }

  return new_slug;
};

export default generate_unique_slug;
