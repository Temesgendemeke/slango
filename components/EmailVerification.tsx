"use client";
import React, { useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { sendVerificationEmail } from "@/lib/auth/auth-client";

const EmailVerification = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return notFound();
  }

  const sendEmail = async () => {
    setLoading(true);
    return await sendVerificationEmail({
      email,
      callbackURL: "/",
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onError: () => {
          toast.error("Oops! Email didn’t vibe. Try again, fam! 😅✉️", {
            position: "top-center",
          });
          setLoading(false);
        },

        onSuccess: () => {
          toast.message(
            "Yo, verification sent! 🚀📧 Go peep your inbox, G 😎🔥",
            { position: "top-center", style: { whiteSpace: "pre" } }
          );
          setLoading(false);
        },
      },
    });
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 p-8 mt-10 border rounded-xl shadow-lg bg-neutral-100 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700">
        <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">
          Verify Your Account
        </h2>
        <p className="text-neutral-700 dark:text-neutral-200 text-center text-lg">
          Yo! Wanna verify your account? <br />
          Smash the button below to get your verification link. <br />
          Didn’t get the email? No stress—just hit that button again, we got you! 🚀📧
        </p>
        <Button
          disabled={loading}
          aria-disabled={loading}
          className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          onClick={sendEmail}
        >
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
