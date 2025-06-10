"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import avater from "@/assets/avater.png";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import uploadImage from "@/utils/uploadImage";
import headers from "@/constants/headers";
import { authStore } from "@/store/useAuthStore";
import SettingSkeleton from "@/components/skeleton/SettingSkeleton";
import { changeEmail, updateUser } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import DeleteUserAlert from "@/components/DeleteUserAlert";

const formSchema = z.object({
  name: z.string().default("noname").optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  image: z.string().optional(),
});

const page = () => {
  const user = authStore((store) => store.user);
  const [image, setImage] = useState<File>(null);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [pending, setPending] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      image: user?.image || avater.src,
    },
  });
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (user) {
      form.reset({
        email: user?.email || "",
        name: user?.name || "",
        image: user?.image || avater.src,
      });
      setUserLoaded(true);
    }
  }, [user]);

  const handle_image = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
    if (!file) return;

    // for preview
    const image_file = URL.createObjectURL(file);
    form.setValue("image", image_file);
  };

  const onSubmit = async (formData) => {
    setPending(true);

    if (image) {
      const { data, error } = await uploadImage(image);

      if (error) {
        setPending(false);
        return toast.error(
          "Oops! Something went wrong uploading your image 😢. Please try again!"
        );
      }
      
      const { public_id, secure_url } = data;

      const res = await fetch(`/api/user/setting/${user.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          public_id: public_id,
          secure_url: secure_url,
        }),
      });

      if (!res.ok) {
        setPending(false);
        const data = await res.json();
        return toast.error(data);
      }
    }

    try {
      await updateUser({
        name: formData.name,
      });

      if (user.email != formData.email) {
        await changeEmail({
          newEmail: formData.email,
          callbackURL: "/",
        });
      } else {
        router.push("/");
      }
      toast.success("🎉 Profile updated successfully! 🚀", {
        position: "top-center",
      });
    } catch (error) {
      setPending(false);
      return toast.error(
        "Failed to update user information. Please try again.",
        { position: "top-center" }
      );
    }
  };

  return (
    <>
      {!isUserLoaded ? (
        <SettingSkeleton />
      ) : (
        <div className="flex items-center justify-center">
          <div className="mt-10 w-full max-w-2xl">
            <div className="flex justfiy-center gap-5 flex-col items-center">
              <Image
                alt=""
                src={form.watch("image") || avater.src}
                width="150"
                height="50"
                className="object-cover  h-52 w-52 border rounded-full"
              ></Image>
              <h2>{form.watch("name")}</h2>
              <DeleteUserAlert />
            </div>

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
                  name="image"
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
                  disabled={pending}
                  aria-disabled={pending}
                >
                  Update profile
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
