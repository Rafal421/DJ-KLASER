import type React from "react";
import "@/app/globals.css";
// import { Montserrat, Poppins, PT_Serif } from "next/font/google";
import { Audiowide, Rajdhani } from "next/font/google";
import type { Metadata } from "next";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-montserrat",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["500"],
//   variable: "--font-poppins",
// });

// const ptSerif = PT_Serif({
//   subsets: ["latin"],
//   weight: ["400"],
// });

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
