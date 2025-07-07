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
  title: "DJ Kalser - Profesjonalne Usługi DJ",
  description: "Profesjonalne usługi DJ na wesela, imprezy oraz eventy firmowe",
  openGraph: {
    title: "DJ Kalser - Profesjonalne Usługi DJ",
    description:
      "Profesjonalne usługi DJ na wesela, imprezy oraz eventy firmowe",
    images: [
      {
        url: "https://res.cloudinary.com/dscvxyjvn/image/upload/v1749125268/a31f0a00-ce73-4134-b245-51ca071eb0b3.png",
        alt: "Logo DJ Kalser",
      },
    ],
    type: "website",
    locale: "pl_PL",
    siteName: "DJ Kalser",
  },
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
