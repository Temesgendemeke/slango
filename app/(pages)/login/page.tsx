"use client";
import Footer from "@/components/Footer";
import React from "react";
import Image from "next/image";
import friends_image from "../../../assets/Ethnic friendship-pana.svg";
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
import Link from "next/link";
import SocialLogin from "@/components/SocialLogin";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long." })
      .max(30, { message: "Username must not exceed 30 characters." })
      .optional(),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .optional(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(50, { message: "Password must not exceed 50 characters." }),
  })
  .refine((data) => data.username || data.email, {
    message: "Either username or email must be provided.",
  });

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = () => {};
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Image alt="friendship" src={friends_image} className="lg:flex-1" />

        <div className="lg:flex-1 lg:mt-10 lg:p-10">
          <h1 className="text-5xl  font-bold text-center mb-10">
            Welcome back
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username/Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username or email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
              <p className="text-sm text-center">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
            
          </Form>

          <SocialLogin/>
        </div>
      </div>
  );
};

export default page;
