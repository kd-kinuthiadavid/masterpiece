"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useCookiesUtils from "@/lib/useCookiesUtils";
import { Button } from "@/components/ui/button";

export default function BuyerDashboard() {
  const { getCurrentUser, removeAllCookies } = useCookiesUtils();
  const currentUser = getCurrentUser();
  const router = useRouter();
  function handleLogout() {
    removeAllCookies();
    router.push("/auth/login");
    toast.success("Logged out successfully");
  }
  return (
    <div className="flex flex-col gap-y-10 items-center justify-center h-screen">
      <h1>Welcome Buyer! Access the marketplace.</h1>

      <div className="flex flex-col gap-y-6 max-w-[90%] min-w-[80%] md:min-w-[60%] lg:min-w-[30%]">
        <div className="flex gap-x-3">
          <Avatar className="w-16 h-16">
            <AvatarFallback>
              {currentUser?.name?.split(" ")[0][0]}
              {currentUser?.name?.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">{currentUser?.name}</p>
            <p className="text-md text-gray-500">{currentUser?.email}</p>
            <p className="text-md text-gray-500 capitalize">
              <span className="font-semibold">Role:</span>{" "}
              {currentUser?.role?.toLowerCase()}
            </p>
          </div>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
