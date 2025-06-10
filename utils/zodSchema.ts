import z from "zod"



export const forgetPasswordSchema = z.object({
    email: z
    .string()
    .email({message:"invalid type"})
    .min(1, {message:"Email is required"})
})