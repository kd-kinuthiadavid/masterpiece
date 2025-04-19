/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import useRegisterForm, {
  RegisterFormSchema,
} from "./_components/useRegisterForm";
import { SelectItem } from "@/components/ui/select";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCookiesUtils from "@/lib/useCookiesUtils";
import { useApiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { registerForm } = useRegisterForm();
  const { setAccessToken, setCurrentUser } = useCookiesUtils();
  const apiClient = useApiClient();

  const userRoles = [
    {
      label: "Buyer",
      value: "BUYER",
      description: "Source materials, hire labor, manage logistics",
    },
    {
      label: "Vendor",
      value: "VENDOR",
      description: "List products, fulfill orders, grow your network",
    },
    {
      label: "Rider",
      value: "RIDER",
      description: "Deliver materials, manage routes, earn on your schedule",
    },
  ];

  const onSubmit = async (data: RegisterFormSchema) => {
    setIsLoading(true);
    const payload = {
      name: data.name,
      email: data.email,
      role: data.role,
    };

    try {
      const response: any = await apiClient.post("/auth/signup", payload);
      if (response.data.code === 201 && response.data.status === "success") {
        setAccessToken(response.data.data.token);
        setCurrentUser(response.data.data.user);
        const newUser = response.data.data.user;

        if (newUser.role === "BUYER") {
          toast.success("Account created successfully", {
            description: "You can now start buying materials",
          });
          router.push("/dashboard/buyer");
        } else if (newUser.role === "VENDOR") {
          toast.success("Account created successfully", {
            description: "You can now start selling materials",
          });
          router.push("/dashboard/vendor");
        } else if (newUser.role === "RIDER") {
          toast.success("Account created successfully", {
            description: "You can now start delivering materials",
          });
          router.push("/dashboard/rider");
        }
      }
    } catch (error) {
      console.error("Error registering user", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-[80%] md:max-w-[60%] lg:max-w-[40%] flex flex-col gap-y-16">
        <div className="flex-col">
          <h1 className="text-3xl font-bold">
            Join Masterpiece — Build Smarter, Together
          </h1>
          <p className="text-md text-muted-foreground max-w-[90%]">
            Create your account to access materials, labor, logistics, and
            financing—all in one place.
          </p>
        </div>

        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            {/* role */}
            <FormField
              control={registerForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role to get started" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex flex-col">
                            <p className="text-md font-medium">{role.label}</p>
                            {field.value !== role.value && (
                              <p className="text-sm text-muted-foreground">
                                {role.description}
                              </p>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* name */}
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder="e.g. John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      placeholder="e.g. john.doe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CTA - register button */}
            <div className="flex flex-col gap-y-4">
              {/* button to test the toast */}
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary cursor-pointer"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
