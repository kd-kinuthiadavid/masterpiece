/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useCookiesUtils from "./useCookiesUtils";
export interface ApiError {
  status: number;
  message: string | any;
  error?: any;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
  status?: number;
}

export default class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private accessToken: string;
  private router: ReturnType<typeof useRouter>;
  constructor(accessToken: string, router: ReturnType<typeof useRouter>) {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
    this.accessToken = accessToken;
    this.router = router;
  }

  async request<T>(
    method: string,
    path: string,
    payload?: any,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    const accessToken = this.accessToken;

    const options: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };

    if (payload) {
      options.body = JSON.stringify(payload);
    }

    try {
      const res = await fetch(`${this.baseURL}${path}`, options);
      const data = await res.json();

      if (!res.ok) {
        // Handle token expiration
        if (
          res.status === 401 &&
          data.message?.toLowerCase().includes("token expired")
        ) {
          // show session expired success toast
          toast.success("Your Session Has Expired!", {
            description:
              "Your session has expired. Please log in again to continue.",
          });
          // redirect to login
          this.router.push("/auth/login");
        }

        return {
          error: {
            status: res.status,
            message: data.message || "Request failed",
            error: data.error,
          },
        };
      }

      return { data, status: res.status };
    } catch (error: any) {
      console.error("API Client Error:", error);
      return {
        error: {
          status: 500,
          message: "Network error",
          error,
        },
      };
    }
  }

  get<T>(path: string, headers: Record<string, string> = {}) {
    return this.request<T>("GET", path, undefined, headers);
  }

  post<T>(path: string, payload?: any, headers: Record<string, string> = {}) {
    return this.request<T>("POST", path, payload, headers);
  }

  patch<T>(path: string, payload: any, headers: Record<string, string> = {}) {
    return this.request<T>("PATCH", path, payload, headers);
  }

  delete<T>(path: string, headers: Record<string, string> = {}) {
    return this.request<T>("DELETE", path, undefined, headers);
  }
}

export function useApiClient() {
  const router = useRouter();
  const { getAccessToken } = useCookiesUtils();
  const accessToken = getAccessToken();

  return useMemo(
    () => new ApiClient(accessToken!, router),
    [accessToken, router]
  );
}
