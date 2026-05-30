import type { Metadata } from "next";
import { Bevan, Kaushan_Script, Libre_Franklin, Oswald } from "next/font/google";
import "./globals.css";

const bevan = Bevan({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poster",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const kaushanScript = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tastes & Tunes Santa Barbara",
  description: "A 2-day oceanfront food and music festival in Santa Barbara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bevan.variable} ${oswald.variable} ${kaushanScript.variable} ${libreFranklin.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
