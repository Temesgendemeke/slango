import GetPostbySlug from "@/components/GetPostBySlug";
import React from "react";
import { fetchPostbySlug } from "@/utils/fetch";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = fetchPostbySlug(slug);

  return {
    title: post.name,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const post = await fetchPostbySlug(slug);

  return <GetPostbySlug slug={slug} data={post} />;
}
