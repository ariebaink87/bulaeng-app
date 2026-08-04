import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { KernelProvider } from "@/components/system/KernelProvider"; // Import Provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bulaeng Teacher OS",
  description: "Operating System for Teachers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  suppressHydrationWarning
>
      <body className="min-h-full flex flex-col">
        <KernelProvider>
          {children}
        </KernelProvider>
      </body>
    </html>
  );
}