import AllActivitiesSection from "@/features/activities/components/AllActivitiesSection";
import PopularActivitiesSection from "@/features/activities/components/PopularActivitiesSection";
import HeroSection from "@/features/home/components/HeroSection";
import SearchSection from "@/features/home/components/SearchSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="mt-10">
        <SearchSection />
      </div>
      <PopularActivitiesSection />
      <AllActivitiesSection />
    </div>
  );
}
