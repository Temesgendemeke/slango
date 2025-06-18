"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/auth/auth-client";
import EyeButton from "./EyeButton";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof token !== "string" || !token) {
      router.replace("/login/forgot-password/invalid-token");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    await resetPassword(
      {
        newPassword: password,
        token,
      },
      {
        onResponse: () => {
          setLoading(false);
        },

        onRequest: () => {
          setLoading(true);
        },

        onSuccess: () => {
          toast.success(
            "Your password has been successfully reset. You can now log in with your new password.",
            { position: "top-center" }
          );
          setTimeout(() => {
            router.push("/login");
          }, 300);
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={onSubmit} className="space-y-4 md:w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your new password below to reset your account password.
        </p>
        <Label>Password</Label>
        <div className="relative">
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <EyeButton
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
        <Button disabled={loading} type="submit">
          reset
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
