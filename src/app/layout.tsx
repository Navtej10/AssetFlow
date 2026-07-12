import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AssetFlow | Enterprise ERP Asset Management",
  description: "Enterprise Asset Management Platform prioritizing clarity, quick actions, and operational awareness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased bg-[#F1F3F7] text-[#111418]`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F1F3F7] text-[#111418] selection:bg-[#2563EB]/15 selection:text-[#1D4ED8]">{children}</body>
    </html>
  );
}

