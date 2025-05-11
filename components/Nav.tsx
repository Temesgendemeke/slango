"use client";
import React, { useState } from "react";
import Link from "next/link";
import ModeToggle from "./ui/ModeToggle";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center border-b p-2 py-4">
      <Link href="/" className="text-4xl font-bold">
        SLANGO
      </Link>

      <div className="items-center gap-2 hidden md:flex">
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
        <ModeToggle />
      </div>

      <div className="md:hidden flex items-center gap-2">
        {isOpen ? (
          <X onClick={()=> setIsOpen(!isOpen)}/>
        ) : (
          <Menu className="size-8" onClick={() => setIsOpen(!isOpen)} />
        )}
        <ModeToggle />
      </div>

      {isOpen && (
        <motion.div
          initial={{ y: -400 }}
          animate={isOpen ? { y: 0 } : { y: -400 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-background border border-secondary shadow-lg z-10`}
        >
          <div className="flex flex-col items-center gap-4 p-4">
            <Link
              href="/signup"
              className="text-lg font-medium text-primary"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="text-lg font-medium text-primary "
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Nav;
