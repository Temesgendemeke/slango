import ResetPassword from "@/components/ResetPassword";
import React, { Suspense } from "react";

export const metadata = {
  title: "reset password",
};

const Page = () => {
  return (
    <Suspense>
      {" "}
      <ResetPassword />
    </Suspense>
  );
};

export default Page;
