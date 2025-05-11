"use client";
import React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Nav from "@/components/Nav";
import GoBack from "@/components/GoBack";

const formSchema = z.object({
  slang: z.string().min(2, {
    message: "slang term must be at least 2 characters.",
  }),
  explanation: z.string().trim().nonempty(),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slang: "",
      explanation: "",
    },
  });

  const onSubmit = () => {};
  return (
    <div className="flex items-center flex-col w-full justify-center p-4">
      <GoBack/>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full md:w-5xl mt-2 p-4 rounded-2xl"
        >
          <h2 className="font-bold text-center ">SUBMIT NEW SLANG</h2>

          <FormField
            control={form.control}
            name="slang"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">slang term</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  enter slang term or phrases you went to share{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">explanation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., A term used to describe excitement or enthusiasm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a clear and concise explanation of the slang term.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="absolute">
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orgin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">origin</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  enter slang term or phrases you went to share{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="example"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">Example usage</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  show how slang term used in context
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"outline"}>add more example</Button>
          <div className="flex  justify-end">
            <Button type="submit" className="block">
              SUBMIT SLANG
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
