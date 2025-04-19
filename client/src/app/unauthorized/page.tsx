/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role: string;
  [key: string]: any;
}

const roleRoutes: { [key: string]: { path: string; title: string } } = {
  BUYER: { path: "/dashboard/buyer", title: "Buyer Dashboard" },
  VENDOR: { path: "/dashboard/vendor", title: "Vendor Dashboard" },
  RIDER: { path: "/dashboard/rider", title: "Rider Dashboard" },
};

export default function UnauthorizedPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Get access token from cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (token) {
      setAccessToken(token);
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleReturnToDashboard = () => {
    if (userRole && roleRoutes[userRole]) {
      router.push(roleRoutes[userRole].path);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Access Denied
          </CardTitle>
          <CardDescription className="text-center">
            You don&apos;t have permission to access this page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Your current role:{" "}
              <span className="font-semibold">
                {userRole || "Not available"}
              </span>
            </p>

            {userRole && roleRoutes[userRole] && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">You have access to:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>{roleRoutes[userRole].title}</li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button onClick={handleReturnToDashboard} className="w-full">
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
