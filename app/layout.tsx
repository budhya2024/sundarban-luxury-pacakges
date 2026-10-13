import type { Metadata } from "next";
import { Manrope, Montez } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppLayoutWrapper } from "@/components/shared/AppLayoutWrapper";

const manrope = Manrope({
  variable: "--font-sans",
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

const knowledgeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sundarbanluxurypackage.com/#website",
      "url": "https://sundarbanluxurypackage.com/",
      "name": "Sundarban Luxury Package",
      "description":
        "Best Sundarban Tour Package from Kolkata with Luxury Hotel Sonar Bangla Stay and Private Cruise.",
      "publisher": {
        "@id": "https://sundarbanluxurypackage.com/#organization",
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://sundarbanluxurypackage.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "TravelAgency",
      "@id": "https://sundarbanluxurypackage.com/#organization",
      "name": "Sundarban Luxury Package",
      "url": "https://sundarbanluxurypackage.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sundarbanluxurypackage.com/logo.png",
      },
      "image": "https://sundarbanluxurypackage.com/logo.png",
      "email": "sundarbanluxurypackage@gmail.com",
      "telephone": "+917001403498",
      "priceRange": "₹₹₹",
      "foundingLocation": {
        "@type": "Place",
        "name": "Kolkata",
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Kolkata",
        },
        {
          "@type": "State",
          "name": "West Bengal",
        },
        {
          "@type": "Country",
          "name": "India",
        },
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dulki, Gosaba",
        "addressLocality": "Sundarban",
        "addressRegion": "West Bengal",
        "postalCode": "743370",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.1652,
        "longitude": 88.8078,
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "08:00",
        "closes": "21:00",
      },
      "sameAs": [
        "https://sundarbanluxurypackage.com/about",
        "https://sundarbanluxurypackage.com/contact",
        "https://sundarbanluxurypackage.com/blog",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://sundarbanluxurypackage.com/#sitelinks",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "About Us",
          "url": "https://sundarbanluxurypackage.com/about",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Tour Blog",
          "url": "https://sundarbanluxurypackage.com/blog",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Contact Us",
          "url": "https://sundarbanluxurypackage.com/contact",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Hotel Sonar Bangla Package",
          "url":
            "https://sundarbanluxurypackage.com/hotel-sonar-bangla-sundarban-weekend-tour-package-from-kolkata",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "1 Night 2 Days Luxury Cruise",
          "url": "https://sundarbanluxurypackage.com/tour/1-night-2-days-luxury-cruise",
        },
      ],
    },
    {
      "@type": "TouristTrip",
      "name": "Sundarban Package Tour with Luxury Hotel Sonar Bangla",
      "description":
        "Experience the ultimate luxury tour of Sundarban starting from Kolkata with premium accommodation at Hotel Sonar Bangla, guided jungle safaris, and fine dining.",
      "provider": {
        "@id": "https://sundarbanluxurypackage.com/#organization",
      },
      "url":
        "https://sundarbanluxurypackage.com/sundarban-package-tour-with-luxury-hotel-sonar-bangla",
      "itinerary": {
        "@type": "City",
        "name": "Kolkata to Sundarban",
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url":
          "https://sundarbanluxurypackage.com/sundarban-package-tour-with-luxury-hotel-sonar-bangla",
      },
    },
    {
      "@type": "TouristTrip",
      "name": "Best Sundarban Tour Package with Hotel Sonar Bangla Stay",
      "description":
        "Top-rated weekend tour package from Kolkata including AC transport, luxury resort stay at Hotel Sonar Bangla, and boat safari permits.",
      "provider": {
        "@id": "https://sundarbanluxurypackage.com/#organization",
      },
      "url":
        "https://sundarbanluxurypackage.com/best-sundarban-tour-package-with-hotel-sonar-bangla-stay",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url":
          "https://sundarbanluxurypackage.com/best-sundarban-tour-package-with-hotel-sonar-bangla-stay",
      },
    },
    {
      "@type": "TouristTrip",
      "name": "1 Night 2 Days Luxury Cruise Tour in Sundarban",
      "description":
        "Short and premium 1N/2D luxury boat cruise tour package in Sundarban with top-tier hospitality and meals.",
      "provider": {
        "@id": "https://sundarbanluxurypackage.com/#organization",
      },
      "url": "https://sundarbanluxurypackage.com/tour/1-night-2-days-luxury-cruise",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": "https://sundarbanluxurypackage.com/tour/1-night-2-days-luxury-cruise",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${montez.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="ZB58AbxPxUoxGQkSUgmlus0ml84nt0MkAAeH680uc0s"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(knowledgeGraph),
          }}
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
