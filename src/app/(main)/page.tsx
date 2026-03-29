import { Suspense } from "react";
import HeroSection from "@/features/home/components/HeroSection";
import SearchSection from "@/features/home/components/SearchSection";
import MainPageClient from "./MainPageClient";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="mt-[40px]">
        <SearchSection />
      </div>
      <Suspense>
        <MainPageClient />
      </Suspense>
    </div>
  );
}
