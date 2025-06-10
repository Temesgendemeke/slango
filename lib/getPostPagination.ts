import { db } from "./prisma";

const getPostPagination = async (page: number, prePage: number) => {
  const skip = (page - 1) * prePage;

  const postPromise = db.slang.findMany({
    include: {
      posted_by: true,
      _count: {
        select: { like: true },
      },
    },
    skip,
    take: prePage,
  });

  const totalPromise = db.slang.count();

  const [posts, total] = await Promise.all([postPromise, totalPromise]);

  return {
    posts,
    total,
    totalPage: Math.ceil(total / prePage),
    currentPage: page,
  };
};

export default getPostPagination;
