import type { Metadata } from "next";
import { Manrope, Geist_Mono, Montez } from "next/font/google";
import "./globals.css";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montez = Montez({
  weight: "400",
  variable: "--font-montez",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sundarban Luxury Package | Luxury Eco Tours & River Safaris",
  description: "Luxury tour packages for Sundarban eco tours, wildlife river safaris, and 5-star resort stays.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${montez.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
