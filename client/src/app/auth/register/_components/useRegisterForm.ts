"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const registerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.enum(["BUYER", "VENDOR", "RIDER", ""]),
});
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export default function useRegisterForm() {
  const registerForm = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  return { registerForm, registerFormSchema };
}
