import { Globe } from "lucide-react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
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
      <body className={`${geistSans.className} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="border-b bg-background">
              <div className="container mx-auto px-4 h-16 flex justify-start items-center">
                <Link href="/" className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="text-xl font-semibold">
                    Around the World
                  </span>
                </Link>
              </div>
            </header>

            <main className="flex-grow">{children}</main>

            <footer className="border-t py-6 md:py-0">
              <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-center text-sm text-muted-foreground">
                  Made by{" "}
                  <a
                    href="https://railsmatic.com"
                    className="underline underline-offset-4"
                  >
                    bakku
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://cursor.com/"
                    className="underline underline-offset-4"
                  >
                    cursor
                  </a>{" "}
                  in Upper Palatine.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/imprint"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Imprint
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </footer>
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
