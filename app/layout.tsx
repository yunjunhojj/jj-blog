import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import BlogHeader from "@/components/BlogHeader";
import ThemeProvider from "@/components/ThemeProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  verification: {
    google: "ZTNwg35sbO8vUq-KLL5UymsED2ARP8DeULxfVmn4SdA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-950">
            <BlogHeader />
            <main className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
              {children}
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
