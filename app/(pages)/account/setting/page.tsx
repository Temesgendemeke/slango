"use client";
import Image from "next/image";
import React from "react";
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
import fifty from "@/assets/Rapper=fiftycent.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { error } from "console";
import uploadImage from "@/utils/uploadImage";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters long." })
    .max(30, { message: "username must not exceed 30 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(50, { message: "Password must not exceed 50 characters." }),
  profile_picture: z.string().optional(),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      profile_picture: "",
    },
  });
  const initalState = { errorMessage: "" };
  const onSubmit = () => {};

  const preset_name = "slango-preset";
  const cloud_name = "drgmsakkn";

  const handle_image = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_name);


      const {data} = await uploadImage(file)
      if(data){
          if (data.secure_url) {
            form.setValue("profile_picture", data.secure_url);
            toast.success("Image uploaded successfully!");
          } else {
            toast.error("Image upload failed.");
          }
        } 
      }

  };

  return (
    <div className="flex items-center justify-center">
      <div className="mt-10 w-full max-w-2xl">
        <div className="flex justfiy-center flex-col items-center">
          <Image
            alt=""
            src={form.watch("profile_picture") || fifty}
            width="200"
            height="50"
          ></Image>
          <h2>50cent</h2>
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
              name="profile_picture"
              render={({ field }) => (
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
