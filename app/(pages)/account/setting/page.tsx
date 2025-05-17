"use client";
import Image from "next/image";
import React, { useState } from "react";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import fifty from "@/assets/avater.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { error } from "console";
import uploadImage from "@/utils/uploadImage";
import headers from "@/constants/headers";
import { authStore } from "@/store/useAuthStore";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters long." })
    .max(30, { message: "username must not exceed 30 characters." }),
  name: z.string().default("noname").optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  profile_picture: z.string().optional(),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "td@gmail.com",
      username: "wemesgen",
      name: "noname",
      profile_picture: fifty.src,
    },
  });
  const initalState = { errorMessage: "" };
  const [image, setImage] = useState<File>(null);
  const user = authStore((store) => store.user);

  const handle_image = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
    if (!file) return;

    // for preview
    const image_file = URL.createObjectURL(file);
    form.setValue("profile_picture", image_file);
  };

  const onSubmit = async (formData) => {
    console.log("clicked ", formData);

    if (!image) return;

    const { data, error } = await uploadImage(image);
    if (error) {
      return toast.error(
        "Oops! Something went wrong uploading your image 😢. Please try again!"
      );
    }
    const { public_id, secure_url } = data;

    await fetch(`/api/user/setting/${user?.username}`, {
      method: "POST",
      headers,
      body: {
        public_id: public_id,
        secure_url: secure_url,
      },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mt-10 w-full max-w-2xl">
        <div className="flex justfiy-center flex-col items-center">
          <Image
            alt=""
            src={form.watch("profile_picture") || fifty} // or placeholder
            width="150"
            height="50"
            className="object-fill h-52 w-52 border rounded-full"
          ></Image>
          <h2>@{form.watch("username")}</h2>
        </div>

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
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="profile_picture"
              render={({ _ }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handle_image}
                    />
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

            <Button
              type="submit"
              className="w-full"
              // disabled={pending}
              // aria-disabled={pending}
            >
              Update profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
