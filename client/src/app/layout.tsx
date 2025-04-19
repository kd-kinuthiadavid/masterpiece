"use client";

import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "next-client-cookies/server";

const raleway = Raleway({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        <CookiesProvider>{children}</CookiesProvider>
        <Toaster />
      </body>
    </html>
  );
}
