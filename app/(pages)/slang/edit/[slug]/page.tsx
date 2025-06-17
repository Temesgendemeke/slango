import SubmitSlangForm from "@/components/SubmitSlangForm";
import React from "react";
import { notFound } from "next/navigation";
import { fetchPostbySlug } from "@/utils/fetch";
import { SlugPagePropes } from "@/types/Props";

export async function generateMetadata({ params }: SlugPagePropes) {
  const { slug } = await params;
  const data = await fetchPostbySlug(slug);

  return {
    title: data.name,
  };
}

const EditSlangPage = async ({ params }: SlugPagePropes) => {
  const { slug } = await params;
  try {
    const data = await fetchPostbySlug(slug);

    return <SubmitSlangForm slang={data} />;
  } catch {
    return notFound();
  }
};

export default EditSlangPage;
