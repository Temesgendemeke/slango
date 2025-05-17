"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import headers from "@/constants/headers";
import { authStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "username must be at least 5 characters long" })
    .max(20, { message: "username must not execeed 20 characters." }),
});
const [loading, setLoading] = useState(true)

const SetUsername = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const [error, setError] = useState("");
  const user = authStore((store) => store.user);
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await fetch(`/api/user/username/${user.id}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const res_data = await res.json();
      console.log(res_data);
      setError(res_data);
      return toast.error(`❌ ${data}`);
    }
    toast.success("🎉 Username set successfully!");
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  return (
    <div className="flex items-center justify-center gap-10 flex-col">
      <Form {...form}>
        <p>{error}</p>
        <h2 className=" mt-20 font-bold text-center text-2xl flex items-center justify-center gap-2">
          🚀 Set your username{" "}
          <span role="img" aria-label="sparkles">
            ✨
          </span>
        </h2>

        <form
          action=""
          className="w-full md:w-xl space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <Button type="submit" className="">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SetUsername;
