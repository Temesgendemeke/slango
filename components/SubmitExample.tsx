"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import headers from "@/constants/headers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/useAuthStore";

const exampleSchema = z.object({
  example: z.string(),
});

const SubmitExample = ({ slug, prevExamples, setSlang }) => {
  const form = useForm({
    resolver: zodResolver(exampleSchema),
    defaultValues: {
      example: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const user = authStore((store) => store.user);
  const router = useRouter();

  const onSubmit = (data) => {
    setLoading(true);
    if (!user) {
      return router.push("/login");
    }
    fetch(`/api/slang/${slug}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        examples: [
          ...(Array.isArray(prevExamples) ? prevExamples : [prevExamples]),
          data.example,
        ],
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return toast.error("Something went wrong. Please try again.");
        }
        setSlang((prev) => ({
          ...prev,
          examples: [...prevExamples, data.example],
        }));
        toast.success("Thanks for submitting, fam! 🔥");
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="example"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">more example</FormLabel>
                <FormControl>
                  <Input
                    placeholder="write your example bro"
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" aria-disabled={loading} disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubmitExample;
