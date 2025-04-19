"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function useLoginForm() {
  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  return { loginForm };
}
