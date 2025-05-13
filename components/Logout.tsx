import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleClick = async () => {
    try {
      await signOut(); // Sign out the user
      router.push("/login"); // Redirect to login page after successful sign-out
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return <Button onClick={handleClick}>Logout</Button>;
};

export default Logout;
