"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Hello World</h1>
        <div className="flex justify-between gap-x-5">
          <Button
            className="capitalize hover:cursor-pointer"
            size="lg"
            onClick={() => router.push("/auth/register")}
          >
            get started today
          </Button>
          <Button
            className="capitalize hover:cursor-pointer"
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
