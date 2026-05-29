import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Monisha",
  description: "A cute birthday greeting with confetti and petals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-background">
      <body className="min-h-full flex flex-col bg-gradient-to-br from-background via-purple-950 to-background">{children}</body>
    </html>
  );
}
