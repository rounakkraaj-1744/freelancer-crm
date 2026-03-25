import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SupabaseAuthProvider } from "@/components/SupabaseProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Safelance CRM | AI-Powered Freelancer CRM",
  description: "Next-generation CRM for freelancers. AI-driven lead management, pipeline tracking, and automated follow-ups.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Safelance CRM",
  },
};

export const viewport: Viewport = {
  themeColor: "#A8B5A2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "font-inter antialiased bg-background text-olive selection:bg-sage/20 selection:text-olive")}>
        <SupabaseAuthProvider>
          <QueryProvider>
            <div className="min-h-screen flex flex-col items-center">
              <div className="w-full max-w-[1920px] min-h-screen flex flex-col shadow-2xl glass">
                {children}
              </div>
            </div>
          </QueryProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
