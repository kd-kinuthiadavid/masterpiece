/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useCookiesUtils from "@/lib/useCookiesUtils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useApiClient } from "@/lib/apiClient";
export default function VendorDashboard() {
  const [listings, setListings] = useState<any[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const router = useRouter();
  const { removeAllCookies, getCurrentUser } = useCookiesUtils();
  const apiClient = useApiClient();
  const currentUser = getCurrentUser();

  function handleLogout() {
    // remove access_token from cookies
    removeAllCookies();
    toast.success("Logged out successfully");
    // redirect to login
    router.push("/auth/login");
  }

  useEffect(() => {
    // fetch listings
    const fetchListings = async () => {
      setIsFetchingProducts(true);
      const listings: any = await apiClient.get("/products");
      console.log("***** listings", listings);
      setListings(listings.data);
      setIsFetchingProducts(false);
    };
    fetchListings();
  }, []);
  return (
    <div className="flex flex-col gap-y-10 items-center justify-center h-screen">
      <h1>Welcome Vendor! Manage your listings.</h1>

      <div className="flex flex-col gap-y-6">
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
        <Separator />
        <div className="flex flex-col gap-y-6">
          <div className="flex items-end justify-between gap-x-10">
            <h2 className="text-lg font-semibold">Your Listings</h2>
            <Button>
              <Plus className="w-4 h-4" />
              Add Listing
            </Button>
          </div>
          <div className="flex flex-col gap-y-6">
            {isFetchingProducts ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : listings.length > 0 ? (
              listings.map((listing) => (
                <>
                  <div key={listing.id} className="flex flex-col gap-y-1">
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold">{listing.name}</p>
                      <p className="text-md text-gray-500 truncate">
                        {listing.description}
                      </p>
                    </div>
                    <p className="text-md font-normal">${listing.price}</p>
                  </div>
                  <Separator />
                </>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-md text-gray-500">No listings found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
