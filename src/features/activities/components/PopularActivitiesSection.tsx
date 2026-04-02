"use client";

import InfiniteScrollList from "@/shared/components/infinite-scroll/InfiniteScrollList";
import { getActivities } from "../api/getActivities";
import {
  ActivitiesListResponse,
  ActivityListItem,
} from "../schemas/activity.schema";
import Card from "@/components/ui/card/card";
import { queryKeys } from "@/shared/api/queryKeys";
import { useRef } from "react";
import CardSkeleton from "@/components/skeleton/cardSkeleton";

export default function PopularActivitiesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (wrapperRef.current?.offsetLeft ?? 0);
    scrollLeft.current = wrapperRef.current?.scrollLeft ?? 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !wrapperRef.current) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = x - startX.current;
    wrapperRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="mx-auto mt-[80px] max-w-[1120px] overflow-hidden px-4 md:px-8">
      <h2 className="text-[20px] font-bold"> 인기 체험</h2>

      <div
        ref={wrapperRef}
        className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <InfiniteScrollList<
          ActivitiesListResponse,
          ActivityListItem,
          number | null
        >
          queryKey={queryKeys.activities.list({
            method: "cursor",
            sort: "most_reviewed",
            size: 4,
          })}
          queryFn={(cursorId) =>
            getActivities({
              method: "cursor",
              cursorId: cursorId ?? undefined,
              sort: "most_reviewed",
              size: 4,
            })
          }
          initialPageParam={null}
          getNextCursor={(lastPage) => lastPage.cursorId ?? null}
          getItems={(page) => page.activities}
          renderItem={(item) => (
            <Card
              key={item.id}
              id={item.id}
              bannerImageUrl={item.bannerImageUrl}
              title={item.title}
              rating={item.rating}
              reviewCount={item.reviewCount}
              price={item.price}
              className="w-[131px] max-w-none shrink-0 md:w-[331px] lg:w-[262px]"
            />
          )}
          listClassName="flex gap-[16px] mt-[24px] pb-[8px] w-full"
          loading={
            <div className="mt-[24px] flex gap-[16px]">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          }
          error={<div className="mt-[24px]">에러 발생</div>}
        />
      </div>
    </div>
  );
}
