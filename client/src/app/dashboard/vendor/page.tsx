"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import useCookiesUtils from "@/lib/useCookiesUtils";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export default function VendorDashboard() {
  const router = useRouter();
  const { removeAllCookies, getCurrentUser } = useCookiesUtils();
  const currentUser = getCurrentUser();
  function handleLogout() {
    // remove access_token from cookies
    removeAllCookies();
    toast.success("Logged out successfully");
    // redirect to login
    router.push("/auth/login");
  }
  return (
    <div className="flex flex-col gap-y-10 items-center justify-center h-screen">
      <h1>Welcome Vendor! Manage your listings.</h1>

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
  );
}
