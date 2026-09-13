import { HeroSlider } from "@/components/home/HeroSlider";
import { TourCategories } from "@/components/home/TourCategories";
import { TourMenuSection } from "@/components/home/TourMenuSection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
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
      <TourCategories />
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
