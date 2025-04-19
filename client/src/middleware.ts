import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Check if the request is for a protected dashboard route
  const path = request.nextUrl.pathname;
  if (!path.startsWith("/dashboard/")) {
    return NextResponse.next();
  }

  // Get the access token from cookies
  const accessToken = request.cookies.get("access_token")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Verify and decode the JWT token
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);
    console.log("***** JWT PAYLOAD *****", payload);

    // Get the user's role from the token
    const userRole = payload.role as string;

    // Define role-based route access
    const roleRoutes: { [key: string]: string } = {
      BUYER: "/dashboard/buyer",
      VENDOR: "/dashboard/vendor",
      RIDER: "/dashboard/rider",
    };

    // Check if the user's role matches the requested route
    const allowedRoute = roleRoutes[userRole];
    if (!allowedRoute || !path.startsWith(allowedRoute)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("***** M/W ERROR *****", error);
    // If token verification fails, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*"],
};
