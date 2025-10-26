import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JJ Blog",
  description: "React, TypeScript, 그리고 웹 개발에 관한 블로그입니다.",
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
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
