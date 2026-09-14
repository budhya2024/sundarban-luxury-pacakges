import { HeroSlider } from "@/components/home/HeroSlider";
import { TourMenuSection } from "@/components/home/TourMenuSection";
import { PopularDestinations } from "@/components/home/TourPackage";
import { HotelSonarBanglaSection } from "@/components/home/HotelSonarBanglaSection";
import { PlanTripSection } from "@/components/home/PlanTripSection";
import { RecentGallery } from "@/components/home/RecentGallery";
import { TrustSection } from "@/components/home/TrustSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsArticles } from "@/components/home/NewsArticles";
import { FaqSection } from "@/components/home/FaqSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <PopularDestinations />
      <HotelSonarBanglaSection />

      <TourMenuSection />
      <PlanTripSection />
      <RecentGallery />
      <TrustSection />
      <TestimonialsSection />
      <FaqSection />
      <NewsArticles />
    </main>
  );
}

