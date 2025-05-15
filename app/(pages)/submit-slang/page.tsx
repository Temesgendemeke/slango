import SubmitSlangForm from "@/components/SubmitSlangForm";
import React from "react";

const URL = process.env.URL;

const page = async () => {
  const fetch_category = async () => {
    const res = await fetch(`${URL}/api/slang/category`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  };

  const categories = await fetch_category();

  return <SubmitSlangForm categories={categories} />;
};

export default page;
