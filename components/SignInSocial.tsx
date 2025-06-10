import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth/auth-client";
const SignInSocial = ({
  provider,
  children,
}: {
  provider: "github" | "google";
  children: React.ReactNode;
}) => {
  return (
    <Button
      onClick={async () => {
        await signIn.social({
          provider,
          callbackURL: "/",
        });
      }}
      className="w-full flex items-center justify-center gap-2 mt-5"
      type="button"
    >
      {children}
    </Button>
  );
};

export default SignInSocial;
