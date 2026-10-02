import type { Metadata } from "next";
import { Manrope, Geist_Mono, Montez } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WFHZ8PRN');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFHZ8PRN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
