import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import google_logo from "../assets/google.svg";
import github_white from "../assets/github-mark-white.svg";
import github_black from "../assets/github-mark.svg";
import { Separator } from "./ui/separator";
import SignInSocial from "./SignInSocial";

const SocialLogin = () => {
  return (
    <>
      <div className="relative my-4">
        <Separator className="" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-background px-2">
          OR
        </span>
      </div>
      <SignInSocial provider="google">
        <Image src={google_logo} alt="Google Icon" width={20} height={20} />
        <span>Sign with Google</span>
      </SignInSocial>
      <SignInSocial provider="github">
        <Image
          src={github_white}
          alt="Google Icon"
          width={20}
          height={20}
          className="dark:hidden"
        />
        <Image
          src={github_black}
          alt="Google Icon"
          width={20}
          height={20}
          className="dark:inline-block hidden"
        />
        <span>Sign with Google</span>
      </SignInSocial>
    </>
  );
};

export default SocialLogin;
