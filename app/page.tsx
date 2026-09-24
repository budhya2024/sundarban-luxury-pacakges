import { HeroSlider } from "@/components/home/HeroSlider";
import { HeroFeaturesBar } from "@/components/home/HeroFeaturesBar";
import { TourMenuSection } from "@/components/home/TourMenuSection";
import { PopularDestinations } from "@/components/home/TourPackage";
import { HotelSonarBanglaSection } from "@/components/home/HotelSonarBanglaSection";
import { PlanTripSection } from "@/components/home/PlanTripSection";
import { SundarbanEnvironmentSection } from "@/components/home/SundarbanEnvironmentSection";
import { RecentGallery } from "@/components/home/RecentGallery";
import { TrustSection } from "@/components/home/TrustSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsArticles } from "@/components/home/NewsArticles";
import { FaqSection } from "@/components/home/FaqSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <HeroFeaturesBar />
      <PopularDestinations />
      <HotelSonarBanglaSection />
      <TourMenuSection />
      <PlanTripSection />
      <SundarbanEnvironmentSection />
      <RecentGallery />
      <TrustSection />
      <TestimonialsSection />
      <FaqSection />
      <NewsArticles />
    </main>
  );
}

