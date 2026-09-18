import { Metadata } from "next";
import HotelHero from "@/components/hotel-sonar-bangla/HotelHero";
import HotelAmenities from "@/components/hotel-sonar-bangla/HotelAmenities";
import HotelGallery from "@/components/hotel-sonar-bangla/HotelGallery";
import HotelBokingForm from "@/components/hotel-sonar-bangla/HotelBokingForm";


export const metadata: Metadata = {
  title: "Hotel Sonar Bangla - 5-Star Luxury Resort in Sundarban | Sundarban Luxury Package",
  description:
    "Experience 5-star luxury at Hotel Sonar Bangla Sundarban. Swimming pool, fine dining, private cruise jetty, and eco-friendly resort hospitality.",
};

export default function HotelPage() {
  return (
    <main className="min-h-screen bg-white">
      <HotelHero />
      <HotelBokingForm />
      <HotelAmenities />
      <HotelGallery />

    </main>
  );
}
