import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leadtribute – Performance Dashboard",
  description: "Unified ad performance, ROAS, and campaign analytics across Meta, Google, TikTok, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast:
                "!bg-zinc-950 !border-zinc-800 !text-white !shadow-xl !shadow-black/50",
              success: "!border-emerald-500/50",
              error: "!border-red-500/50",
            },
          }}
        />
      </body>
    </html>
  );
}
