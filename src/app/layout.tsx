import type React from "react";
import "@/app/globals.css";
import { Audiowide, Rajdhani } from "next/font/google";
import type { Metadata } from "next";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "DJ Kalser - Professional DJ Services",
  description:
    "Professional DJ services for weddings, parties, and corporate events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${audiowide.variable} ${rajdhani.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
