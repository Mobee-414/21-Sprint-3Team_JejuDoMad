"use client";

import InfiniteScrollList from "@/shared/components/infinite-scroll/InfiniteScrollList";
import { getActivities } from "../api/getActivities";
import {
  ActivitiesListResponse,
  ActivityListItem,
} from "../schemas/activity.schema";
import Card from "@/components/ui/card/card";
import { queryKeys } from "@/shared/api/queryKeys";
import CardSkeleton from "@/components/skeleton/cardSkeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function PopularActivitiesSection() {
  return (
    <div className="mx-auto mt-[80px] max-w-[1120px] overflow-hidden px-4 md:px-8">
      <h2 className="text-[20px] font-bold"> 인기 체험</h2>

      <ScrollArea className="mt-[24px] w-full">
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
          listClassName="flex gap-[16px] pb-6 md:pb-10"
          loading={
            <div className="flex gap-[16px] pb-6 md:pb-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} className="w-[131px] max-w-none shrink-0 md:w-[331px] lg:w-[262px]" />
              ))}
            </div>
          }
          error={<div className="mt-[24px]">에러 발생</div>}
        />
        <ScrollBar
          orientation="horizontal"
          className="mt-4 h-1.5 w-full rounded-full bg-gray-100/50"
        />
      </ScrollArea>
    </div>
  );
}
