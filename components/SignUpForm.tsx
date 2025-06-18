"use client";
import React, {  useTransition } from "react";
import Image from "next/image";
import friends_image2 from "@/assets/Feeling proud-amico.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SocialLogin from "@/components/SocialLogin";
import { signup } from "@/lib/actions";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password must not exceed 50 characters." }),
});

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data) => {
    try {
      startTransition(() => {
        signup(data).then(({ success, errorMessage }) => {
          if (!success) {
            toast.error(errorMessage, { position: "top-center" });
          } else {
            window.location.replace("/");
          }
        }).catch((error) => {
          const message =
            error instanceof Error ? error.message : "Something went wrong";
          toast.error(message, { position: "top-center" });
        });
      });
    } catch  {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };

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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                aria-disabled={isPending}
              >
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

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
