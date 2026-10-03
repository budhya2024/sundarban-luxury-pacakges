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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://sundarbanluxurypackage.com/"
  ),
  title: "Sundarban Tour Package from Kolkata | Best Jungle Safari Booking",
  description:
    "Book affordable Sundarban tour packages from Kolkata. Experience thrilling boat safari, wildlife spotting, and cozy stays. Call now for best offers!",
  keywords: [
    "sundarban tour package",
    "sundarban trip from kolkata",
    "sundarban jungle safari booking",
    "sundarban tour cost",
    "2 days sundarban tour",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundarban Tour Package from Kolkata",
    description: "Experience the best Sundarban jungle safari with us.",
    images: ["https://sundarbanluxurypackage.com/images/sundarban-banner.jpg"],
  },
  verification: {
    google: "ZB58AbxPxUoxGQkSUgmlus0ml84nt0MkAAeH680uc0s",
  },
  alternates: {
    canonical: "https://sundarbanluxurypackage.com/sundarban-tour-package/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${montez.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="ZB58AbxPxUoxGQkSUgmlus0ml84nt0MkAAeH680uc0s"
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-59632GF7');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59632GF7"
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
