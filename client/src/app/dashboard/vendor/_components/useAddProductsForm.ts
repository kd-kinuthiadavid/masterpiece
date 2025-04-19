"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const addProductsFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string().min(1, { message: "Price is required" }),
});

export type AddProductsFormSchema = z.infer<typeof addProductsFormSchema>;

export default function useAddProductsForm() {
  const addProductsForm = useForm<AddProductsFormSchema>({
    resolver: zodResolver(addProductsFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
    },
  });

  return { addProductsForm, addProductsFormSchema };
}
