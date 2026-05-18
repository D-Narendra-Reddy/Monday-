import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monday Motivation | Fresh Energy",
  description: "Boost your energy, focus, and positivity for the week ahead.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased h-full`}>
      <body className="min-h-full font-sans text-slate-800 bg-orange-50 selection:bg-orange-200">
        {children}
      </body>
    </html>
  );
}
