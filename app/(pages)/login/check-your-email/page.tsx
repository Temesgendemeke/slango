import React from "react";
import mailbox_pan from "@/assets/Mailbox-pana.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Check your Email",
};

const CheckEmail = () => {
  return (
    <div className="flex flex-col items-center ">
      <Image alt="mailbox" src={mailbox_pan}></Image>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Check your email</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-400 max-w-xl">
          We’ve sent a confirmation link to your email address. Please check
          your inbox and follow the instructions to continue.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
