"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 justify-center items-center text-center">
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Masterpiece: The Ultimate Construction Companion.
          </h1>
          <h2 className="text-xl md:text-2xl font-light md:max-w-[70%]">
            Build smarter, faster, and more efficiently with a single platform
            that brings every essential service under one roof.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <Button
            className="capitalize hover:cursor-pointer text-base"
            size="lg"
            onClick={() => router.push("/auth/register")}
          >
            get started today
          </Button>
          <Button
            className="capitalize hover:cursor-pointer text-base"
            size="lg"
            variant="outline"
            onClick={() => router.push("/auth/login")}
          >
            already a member? login
          </Button>
        </div>
      </main>
    </div>
  );
}
