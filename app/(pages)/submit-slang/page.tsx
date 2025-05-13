"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Schema, z } from "zod";
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
import { flags } from "@/constants/flags";
import { languages } from "@/constants/languages";

const formSchema = z.object({
  slang: z.string().min(2, {
    message: "slang term must be at least 2 characters.",
  }),
  explanation: z.string().trim().nonempty(),
  language: z.string().length(2),
  country: z.string().length(2),
  founder: z.string().optional().default("unknown"),
  pronouction: z.string().optional(),
  example: z.string(),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slang: "",
      explanation: "",
      language: "en",
      country: "US",
      founder: "",
      pronouction: "",
      example: "",
    },
  });

  const onSubmit = () => {};
  return (
    <div className="flex items-center flex-col w-full justify-center p-4">
      <GoBack />
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
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">Language</FormLabel>
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
                    {languages.map((language, index) => (
                      <SelectItem
                        key={index}
                        value={language.code}
                        defaultChecked={language.code === "en"}
                      >
                        {language.name}
                      </SelectItem>
                    ))}
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
            name="pronouction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">pronouanction</FormLabel>

                <FormControl className="w-full">
                  <Input type="text" value={field.value} />
                </FormControl>

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
            name="founder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">Founder</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">Country</FormLabel>
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
                    {flags.map((flag, index) => (
                      <SelectItem
                        key={index}
                        value={flag.code}
                        defaultChecked={flag.code == "US"}
                      >
                        {flag.emoji} {flag.name}
                      </SelectItem>
                    ))}
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
