"use client";
import React, { useEffect, useState } from "react";
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
import GoBack from "@/components/GoBack";
import { flags } from "@/constants/flags";
import { languages } from "@/constants/languages";
import { Trash2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import { authStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import generate_unique_slug from "@/utils/generate_unique";

const URL = process.env.URL;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "slang term must be at least 2 characters.",
  }),
  explanation: z.string().trim().nonempty(),
  language: z.string().length(2),
  country: z.string().length(2),
  originator: z.string().optional().default("unknown"),
  englishPronunciation: z.string().optional(),
  examples: z.array(z.string()).min(1, "At least one example is required"),
  category_id: z.string().optional(),
});

const SubmitSlangForm = ({ slang = null }) => {
  const user = authStore((state) => state.user);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: slang?.name || "",
      explanation: slang?.explanation || "",
      language: slang?.language || "",
      country: slang?.country || "",
      originator: slang?.originator || "",
      englishPronunciation: slang?.englishPronunciation || "",
      examples: slang?.examples ? [...slang.examples] : [""],
      category_id: slang?.category_id || "",
    },
  });
  const edit_mode = !!slang;
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetch_category = async () => {
      const res = await fetch(`/api/slang/category`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    };

    fetch_category();
  });

  const onSubmit = async (data) => {
    console.log({ ...data, ...slang });

    if (edit_mode) {
      const res = await fetch(`/api/slang`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          id: slang.id,
        }),
      });
      if (!res.ok) {
        toast.error("failed to update, try again");
      } else {
        toast.message("🎉 Slang updated successfully! 🚀");
        redirect("/");
      }
      return;
    }

    const res = await fetch(`/api/slang`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, user_id: user.id }),
    });
    if (!res.ok) {
      toast.error("try again");
    } else {
      toast.message("🎉 Slang posted successfully! 🚀✨");
      setTimeout(() => {
        redirect("/");
      }, 300);
    }
  };

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">slang term</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  enter slang term or phrases you want to share{" "}
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
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="absolute">
                    {languages.map((language, index) => (
                      <SelectItem key={index} value={language.code}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the language for this slang term.
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
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_label">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="absolute">
                    {categories?.map((c, index) => (
                      <SelectItem key={index} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
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
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {flags.map((flag, index) => (
                      <SelectItem key={index} value={flag.code}>
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

export default SubmitSlangForm;
