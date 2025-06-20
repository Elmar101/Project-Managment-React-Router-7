import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});