"use client"
import React from "react";
import Link from "next/link";
import ModeToggle from "./ui/ModeToggle";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { authStore } from "@/store/useAuthStore";
import { useSession } from "@/lib/auth/auth-client";
import Account from "./Account";


const Nav = () => {
  const user = authStore((store) => store.user);
  const { data } = useSession();



  

  return (
    <div className="flex justify-between items-center border-b p-2 py-4">
      <Link href="/" className="text-4xl font-bold">
        SLANGO
      </Link>


      <div className="items-center gap-2 hidden md:flex">
        {user ? (
          <Account />
        ) : (
          <>
            <Button
              onClick={() => redirect("/signup")}
              className="transition duration-300 ease-in border-white bg-transparent hover:bg-primary  text-primary hover:text-secondary"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => redirect("/login")}
              className="transition duration-300 ease-in border border-primary bg-transparent hover:bg-primary text-primary hover:text-secondary"
            >
              Login
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Nav;
