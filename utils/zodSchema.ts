import z from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "invalid type" })
    .min(1, { message: "Email is required" }),
});

export const SettingFormSchema = z.object({
  name: z.string().default("noname").optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  image: z.string().optional(),
});
