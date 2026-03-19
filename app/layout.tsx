import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google"
import "./globals.css";

import { Providers } from "@/components/ui/theme-provider";
import Cursor from "@/components/cursor/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Ranjima Ghosh | Frontend Developer",
  description: "Frontend Developer specializing in React, Next.js, and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Providers>

          {/* Custom Cursor */}
          <Cursor />

          {children}

        </Providers>

      </body>

    </html>
  );
}