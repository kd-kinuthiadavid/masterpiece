import { Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "Masterpiece",
  description:
    "Build smarter, faster, and more efficiently with a single platform that brings every essential service under one roof",
};

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
        <CookiesProvider>
          <Toaster />
          {children}
          <Analytics />
        </CookiesProvider>
      </body>
    </html>
  );
}
