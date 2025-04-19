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
import useAddProductsForm, {
  AddProductsFormSchema,
} from "./_components/useAddProductsForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export default function VendorDashboard() {
  const [listings, setListings] = useState<any[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const router = useRouter();
  const { removeAllCookies, getCurrentUser } = useCookiesUtils();
  const apiClient = useApiClient();
  const currentUser = getCurrentUser();
  const { addProductsForm } = useAddProductsForm();

  function handleLogout() {
    // remove access_token from cookies
    removeAllCookies();
    toast.success("Logged out successfully");
    // redirect to login
    router.push("/auth/login");
  }

  async function handleAddProduct(data: AddProductsFormSchema) {
    try {
      setIsAddingProduct(true);
      const response = await apiClient.post("/products", {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
      });
      console.log("***** PRODUCT CREATE RESPONSE", response);
      if (response.error) {
        toast.error(response.error.message);
      } else {
        toast.success("Product added successfully");
      }
    } catch (error) {
      console.error("***** PRODUCT CREATE ERROR", error);
      toast.error("Failed to add product");
    } finally {
      setIsAddingProduct(false);
      setShowAddProductForm(false);
      addProductsForm.reset();
      fetchListings();
    }
  }

  // fetch listings
  async function fetchListings() {
    setIsFetchingProducts(true);
    const listings: any = await apiClient.get("/products");
    console.log("***** listings", listings);
    setListings(listings.data);
    setIsFetchingProducts(false);
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center h-screen overflow-y-auto">
      <h1>Welcome Vendor! Manage your listings.</h1>

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
        <Separator />
        <div className="flex flex-col gap-y-6">
          <div className="flex items-end justify-between gap-x-10">
            <h2 className="text-2xl font-semibold">Your Products</h2>
            <Button
              disabled={isAddingProduct}
              onClick={() => {
                setShowAddProductForm(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Listing
            </Button>
          </div>
          <div className="flex flex-col gap-y-6">
            {showAddProductForm && (
              <div className="flex flex-col gap-y-6">
                <h2 className="text-lg font-semibold">Add Listing</h2>
                <Form {...addProductsForm}>
                  <form
                    onSubmit={addProductsForm.handleSubmit(handleAddProduct)}
                    className="flex flex-col gap-y-6 border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex flex-col gap-y-4">
                      <FormField
                        control={addProductsForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="name"
                                placeholder="e.g. Apple"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addProductsForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="description"
                                placeholder="e.g. A red apple"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addProductsForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="price"
                                placeholder="e.g. 1.99"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-between gap-x-4 w-full">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddProductForm(false)}
                        className="min-w-[40%]"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isAddingProduct}
                        className="min-w-[40%]"
                      >
                        {isAddingProduct ? "Adding..." : "Add Listing"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {isFetchingProducts ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : listings.length > 0 ? (
              listings.map((listing, idx) => (
                <>
                  <div key={idx} className="flex flex-col gap-y-1">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold">{listing.name}</p>
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
