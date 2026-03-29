"use client";

import { useSearchParams } from "next/navigation";
import AllActivitiesSection from "@/features/activities/components/AllActivitiesSection";
import PopularActivitiesSection from "@/features/activities/components/PopularActivitiesSection";
import SearchResultSection from "@/features/home/components/SearchResultSection";

export default function MainPageClient() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  if (keyword) {
    return <SearchResultSection keyword={keyword} />;
  }

  return (
    <>
      <PopularActivitiesSection />
      <AllActivitiesSection />
    </>
  );
}
