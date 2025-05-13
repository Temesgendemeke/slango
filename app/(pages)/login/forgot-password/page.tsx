"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetPassword } from "@/lib/auth/auth-client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const page = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    const { error } = await forgetPassword({
      email,
      redirectTo: "/login/reset-password",
    });

    if (error) {
      setMessage(
        "An error occurred while processing your request. Please try again."
      );
    } else {
      setMessage("A verification code has been sent to your email address.");
    }
    setEmail("");
  };

  useEffect(() => {
    toast.message(message);
  }, [message]);
  return (
    <div className="flex justify-center mt-10">
      <p>{message}</p>

      <form action="" onSubmit={onSubmit} className="space-y-4 md:w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4">Forgot Your Password?</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email address below, and we'll send you a verification code
          to reset your password.
        </p>
        <p>{email}</p>
        <Label>Email</Label>
        <Input type="email" onChange={(e) => setEmail(e.target.value)}></Input>
        <Button type="submit">Submit</Button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default page;
