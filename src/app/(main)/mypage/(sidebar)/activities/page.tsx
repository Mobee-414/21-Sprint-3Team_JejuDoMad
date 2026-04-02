"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import MyActivityCard from "@/components/ui/card/MyActivityCard";
import { cn } from "@/lib/utils";
import { useMyActivities } from "@/features/myActivities/hooks/useMyActivities";
import {
  type ActivitiesListResponse,
  type ActivityListItem,
} from "@/features/activities/schemas/activity.schema";
import MyActivityCardSkeleton from "@/features/myActivities/components/myActivityCardSkeleton";
import MyActivityEmpty from "@/features/myActivities/components/myActivityEmpty";
import InfiniteScrollList from "@/shared/components/infinite-scroll/InfiniteScrollList";
import { queryKeys } from "@/shared/api/queryKeys";

export default function MyActivitiesPage() {
  const { fetchActivities, getNextCursor } = useMyActivities();

  return (
    <section className="flex flex-col gap-6 py-4">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="truncate text-18-b text-foreground lg:text-18-b">
            내 체험 관리
          </h3>
          <p className="text-sm break-keep text-muted-foreground">
            내 체험 관리 아래에 체험을 등록하거나 수정 및 삭제가 가능합니다.
          </p>
        </div>

        <Link
          href="/mypage/manage/register"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "shrink-0 px-3 py-4 text-white sm:w-36 sm:px-6 sm:py-6",
            "text-sm sm:text-base",
          )}
        >
          체험 등록하기
        </Link>
      </div>

      <InfiniteScrollList<
        ActivitiesListResponse,
        ActivityListItem,
        number | null
      >
        queryKey={queryKeys.myActivities.list({ size: 20 })}
        queryFn={fetchActivities}
        initialPageParam={null}
        getNextCursor={getNextCursor}
        getItems={(page) => page.activities}
        renderItem={(activity) => (
          <MyActivityCard key={activity.id} {...activity} />
        )}
        loading={
          <div className="flex flex-col gap-4 lg:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <MyActivityCardSkeleton key={i} />
            ))}
          </div>
        }
        loadingMore={<MyActivityCardSkeleton />}
        empty={<MyActivityEmpty />}
        error={
          <div className="py-20 text-center text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        }
        listClassName="flex flex-col gap-4 lg:gap-6"
      />
    </section>
  );
}
