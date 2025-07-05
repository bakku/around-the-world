import React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import Providers from "./_components/Providers";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Around the World",
    template: "%s | Around the World",
  },
  description:
    'Play the darts game "Around the World", track your scores and see how you improve yourself over time',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.className, "antialiased")}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow flex flex-col xl:mx-auto xl:container">
              {children}
            </main>

            <Footer />
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
