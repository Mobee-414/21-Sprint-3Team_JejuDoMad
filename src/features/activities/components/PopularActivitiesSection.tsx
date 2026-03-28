"use client";

import { useActivities } from "../hooks/useActivities";
import Card from "@/components/ui/card/card";

export default function PopularActivitiesSection() {
  const { data, isLoading, error } = useActivities({
    page: 1,
    size: 10,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  const popularActivities = data?.activities
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="mx-auto mt-[80px] max-w-[1120px]">
      <h2 className="text-[20px] font-bold"> 인기 체험</h2>

      <div className="mt-[24px] grid grid-cols-2 gap-[16px] md:grid-cols-4">
        {popularActivities?.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            bannerImageUrl={item.bannerImageUrl}
            title={item.title}
            rating={item.rating}
            reviewCount={item.reviewCount}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
