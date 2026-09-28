import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Map | Sundarban Luxury Package",
  description:
    "Explore the complete HTML sitemap of Sundarban Luxury Package. Find direct links to all luxury tour packages, resort bookings, blog articles, photo gallery, and contact information.",
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
