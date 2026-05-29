import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Happy Birthday Monisha ✨",
  description: "An ultra-premium animated birthday celebration with magical animations, interactive games, and heartfelt wishes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth bg-background">
      <body className={`${playfair.variable} ${inter.variable} min-h-full flex flex-col bg-background text-foreground`}>{children}</body>
    </html>
  );
}
