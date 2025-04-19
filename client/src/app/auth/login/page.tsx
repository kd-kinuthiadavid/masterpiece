"use client";
import { useState } from "react";
import useLoginForm, { LoginFormSchema } from "./_components/useLoginForm";
import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { loginForm } = useLoginForm();

  const onSubmit = (data: LoginFormSchema) => {
    console.log("***** SUBMITTED LOGIN FORM *****");
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-[80%] md:max-w-[60%] lg:max-w-[40%] flex flex-col gap-y-16">
        <div className="flex-col">
          <h1 className="text-3xl font-bold">
            Glad to see you back at Masterpiece.
          </h1>
          <p className="text-md text-muted-foreground max-w-[90%]">
            Sign in to your account to access materials, labor, logistics, and
            financing—all in one place.
          </p>
        </div>

        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            {/* email */}
            <FormField
              control={loginForm.control}
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

            {/* CTA - login button */}
            <div className="flex flex-col gap-y-4">
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary cursor-pointer"
                >
                  Register Here
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
