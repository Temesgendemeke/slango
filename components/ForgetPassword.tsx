"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetPassword } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { forgetPasswordSchema } from "@/utils/zodSchema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const form = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const { error } = await forgetPassword({
      email: values.email,
      redirectTo: "/login/reset-password",
    });

    if (error) {
      toast.error(
        "An error occurred while processing your request. Please try again.",
        {
          position: "top-center",
          style: { transform: "translateY(0)", transition: "transform 0.3s" },
          className: "slide-in-toast",
        }
      );
    } else {
      toast.success(
        "A verification code has been sent to your email address.",
        {
          position: "top-center",
          style: { transform: "translateY(0)", transition: "transform 0.3s" },
          className: "slide-in-toast",
        }
      );
      setTimeout(() => {
        router.push("/login/check-your-email");
      }, 300);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-10">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:w-2xl w-full"
        >
          <h1 className="text-2xl font-bold mb-4">Forgot Your Password?</h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your email address below, and we'll send you a verification
            code to reset your password.
          </p>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPassword;
