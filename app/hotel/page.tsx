import { Metadata } from "next";
import HotelHero from "@/components/hotel/HotelHero";
import HotelOverview from "@/components/hotel/HotelOverview";
import HotelAmenities from "@/components/hotel/HotelAmenities";
import HotelGallery from "@/components/hotel/HotelGallery";


export const metadata: Metadata = {
  title: "Hotel Sonar Bangla - 5-Star Luxury Resort in Sundarban | Sundarban Luxury Package",
  description:
    "Experience 5-star luxury at Hotel Sonar Bangla Sundarban. Swimming pool, fine dining, private cruise jetty, and eco-friendly resort hospitality.",
};

export default function HotelPage() {
  return (
    <main className="min-h-screen bg-white">
      <HotelHero />
      <HotelOverview />
      <HotelAmenities />
      <HotelGallery />

    </main>
  );
}
