"use client";
import React from "react";
import Link from "next/link";
import ModeToggle from "./ui/ModeToggle";
import { Button } from "./ui/button";
import Account from "./Account";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/useAuthStore";

const Nav = () => {
  const router = useRouter();
  const user = authStore((state) => state.user);

  return (
    <div
      className="flex justify-between sticky top-0 z-30 backdrop-blur-lg
 items-center border-b p-2 py-4"
    >
      <Link href="/" className="text-4xl font-bold">
        SLANGO
      </Link>

      <div className="items-center gap-2 flex">
        {user ? (
          <>
            <Account />
          </>
        ) : (
          <div className="hidden md:flex">
            <Button
              onClick={() => router.push("/signup")}
              className="transition duration-300 ease-in border-white bg-transparent hover:bg-primary  text-primary hover:text-secondary"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => router.push("/login")}
              className="transition duration-300 ease-in border border-primary bg-transparent hover:bg-primary text-primary hover:text-secondary"
            >
              Login
            </Button>
          </div>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Nav;
