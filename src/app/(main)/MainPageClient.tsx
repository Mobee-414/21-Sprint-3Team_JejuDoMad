"use client";

import { useSearchParams } from "next/navigation";
import AllActivitiesSection from "@/features/activities/components/AllActivitiesSection";
import PopularActivitiesSection from "@/features/activities/components/PopularActivitiesSection";
import SearchResultSection from "@/features/home/components/SearchResultSection";

export default function MainPageClient() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const hasKeyword = Boolean(keyword);

  return (
    <div className="min-h-[1000px]">
      {hasKeyword ? (
        <SearchResultSection keyword={keyword} />
      ) : (
        <>
          <PopularActivitiesSection />
          <AllActivitiesSection />
        </>
      )}
    </div>
  );
}
