"use client";
import React, { useEffect } from "react";
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
import { Trash2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import { authStore } from "@/store/useAuthStore";

const formSchema = z.object({
  slang: z.string().min(2, {
    message: "slang term must be at least 2 characters.",
  }),
  explanation: z.string().trim().nonempty(),
  language: z.string().length(2),
  country: z.string().length(2),
  originator: z.string().optional().default("unknown"),
  englishPronunciation: z.string().optional(),
  examples: z.array(z.string()).length(1),
  category: z.string().optional(),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slang: "",
      explanation: "",
      language: "en",
      country: "US",
      originator: "",
      englishPronunciation: "",
      examples: [""],
      category: "",
    },
  });

  const user = authStore((store) => store.user);

  // useEffect(() => {
  //   if (!user) {
  //     return redirect("/login");
  //   }
  // });

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

          {form.watch("language") !== "en" && (
            <FormField
              control={form.control}
              name="englishPronunciation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form_label">
                    english pronunciation
                  </FormLabel>

                  <FormControl className="w-full">
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormDescription>
                    Provide the English pronunciation of the slang term.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
            name="originator"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">Originator</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g., A term used to describe excitement or enthusiasm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the name of the person or group who coined the slang
                  term (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
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
                  Select a category that best describes the slang term.
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
                  <SelectContent className="">
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
                  Select the country where this slang term is commonly used.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("examples")?.map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`examples.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form_label">
                    Example usage {index + 1}
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input placeholder={`Example ${index + 1}`} {...field} />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const examples = form.getValues("examples");
                          form.setValue(
                            "examples",
                            examples.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Show how the slang term is used in context.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            variant={"outline"}
            type="button"
            onClick={() =>
              form.setValue("examples", [
                ...(form.getValues("examples") || []),
                "",
              ])
            }
          >
            Add more example
          </Button>
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
