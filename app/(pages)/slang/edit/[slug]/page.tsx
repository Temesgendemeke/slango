import SubmitSlangForm from "@/components/SubmitSlangForm";
import React from "react";
import { redirect } from "next/navigation";
import { URL } from "@/constants/config";

const EditSlangPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  try {
    const res = await fetch(`${URL}/api/slang/${slug}`);
    const slang = await res.json();

    return <SubmitSlangForm slang={slang} />;
  } catch (_) {
    return redirect("/not-found");
  }
};

export default EditSlangPage;
