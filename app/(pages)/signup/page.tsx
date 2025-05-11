"use client";
import Footer from "@/components/Footer";
import React from "react";
import Image from "next/image";
import friends_image2 from "../../../assets/Feeling proud-amico.svg";
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
import { Separator } from "@/components/ui/separator";
import SocialLogin from "@/components/SocialLogin";


const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long." })
      .max(30, { message: "Username must not exceed 30 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
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
    <div>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-5">
        <Image alt="friendship" src={friends_image2} className="flex-1 " />

        <div className="flex-1 md:mt-10 p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
            Drop Your Slang, Blow Some Minds!
          </h1>
          <p className="text-center text-shadow-primary mb-4">
            Create your account and start exploring a world of possibilities.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-10 mb-5"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username/Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
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
                Sign up
              </Button>
              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </Form>

          

          <SocialLogin/>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
