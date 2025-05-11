import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";


const GoBack = () => {
  return (
    <Link href="/" className="flex items-center mt-2 gap-2 self-start justify-self-start mb-5 text-primary text-sm ">
      <ArrowLeft />
      go back to home
    </Link>
  );
};

export default GoBack;
