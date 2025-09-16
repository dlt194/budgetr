import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import DesktopLayout from "@/desktop/layout";
import MobileLayout from "@/mobile/layout";
import { headers } from "next/headers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budgetr",
  description: "A simple budget tracking app",
};

export function Analytics() {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <Script
      src="https://analytics.dlt.me.uk/api/script.js"
      data-site-id={process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID}
      {...(isDev && { "data-api-key": process.env.NEXT_PUBLIC_RYBBIT_API_KEY })}
      data-tracking-errors="true"
      data-session-replay="true"
      defer
    />
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const ua = headersList.get("user-agent") || "";
  const isMobile = /Mobi|Android/i.test(ua);

  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isMobile ? (
          <MobileLayout>{children}</MobileLayout>
        ) : (
          <DesktopLayout>{children}</DesktopLayout>
        )}
      </body>
    </html>
  );
}
