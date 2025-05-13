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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/auth/auth-client";

const page = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword];
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login/forgot-password");
      return;
    }
  }, [token]);

  const onSubmit = async () => {
    if (!token) return;
    const { error } = await resetPassword({
      newPassword: password,
      token,
    });

    if (error) {
      setMessage(
        "An error occurred while processing your request. Please try again."
      );
    } else {
      toast.success(
        "Your password has been successfully reset. You can now log in with your new password."
      );
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
    setEmail("");
  };

  useEffect(() => {
    toast.message(message);
  }, [message]);
  return (
    <div className="flex justify-center mt-10">
      <form action="" onSubmit={onSubmit} className="space-y-4 md:w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your new password below to reset your account password.
        </p>
        {message && <p>{message}</p>}
        <Label>Password</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button type="submit">reset</Button>
      </form>
    </div>
  );
};

export default page;
