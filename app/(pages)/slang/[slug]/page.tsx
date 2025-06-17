import GetPostbySlug from "@/components/GetPostBySlug";
import React from "react";
import { fetchPostbySlug } from "@/utils/fetch";
import { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await fetchPostbySlug(slug);

  return {
    title: post.name,
  };
}

export default async function Page({ params }) {
  const { slug } = params;

  const post = await fetchPostbySlug(slug);

  return <GetPostbySlug slug={slug} data={post} />;
}
