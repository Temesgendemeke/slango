import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";

const Logout = () => {
  const handleClick = async () => {
    try {
      await signOut();
      redirect("/login");
    } catch {}
  };

  return <Button onClick={handleClick}>Logout</Button>;
};

export default Logout;
