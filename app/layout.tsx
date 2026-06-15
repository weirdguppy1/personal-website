import type { Metadata } from "next";
import { DotGothic16, Doto } from "next/font/google";
import "./globals.css";

const dotGothic = DotGothic16({
  variable: "--font-dot-gothic",
  weight: "400",
  subsets: ["latin"],
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
      className={`${dotGothic.variable} ${doto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}