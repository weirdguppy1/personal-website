import type { Metadata } from "next";
import { Doto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", style: "normal", weight: "300 900" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", style: "italic", weight: "300 900" },
  ],
});

const windsor = localFont({
  variable: "--font-windsor",
  // ponytail: single static cut, declared as 700 so bold requests match it
  // instead of triggering faux-bold synthesis
  src: [{ path: "./fonts/windsor.woff2", style: "normal", weight: "700" }],
  fallback: ["Georgia", "serif"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mark f.",
  description: "portfolio of mark fang, software developer & creative.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${windsor.variable} ${doto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}