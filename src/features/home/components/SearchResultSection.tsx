"use client";

import { useState } from "react";
import Card from "@/components/ui/card/card";
import Pagination from "@/features/activities/components/Pagination";
import { useActivities } from "@/features/activities/hooks/useActivities";
import { usePageSize } from "@/features/activities/hooks/usePageSize";
import CardSkeleton from "@/components/skeleton/cardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  keyword: string;
}

export default function SearchResultSection({ keyword }: Props) {
  const PAGE_SIZE = usePageSize();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useActivities({
    method: "offset",
    page,
    size: PAGE_SIZE,
    sort: "latest",
    keyword,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="mx-auto mt-[80px] max-w-[1120px]">
      {isLoading ? (
        <>
          <Skeleton className="h-[18px] w-[260px]" />
          <Skeleton className="mt-[16px] h-[18px] w-[100px]" />
        </>
      ) : (
        <>
          <p className="text-[18px] text-[#84858C]">
            <span className="font-bold text-[#1b1b1d]">
              &quot;{keyword}&quot;
            </span>
            으로 검색한 결과입니다
          </p>
          <p className="mt-[16px] text-[18px] font-bold">
            총 {totalCount}개 결과
          </p>
        </>
      )}

      {isLoading ? (
        <div className="mt-[24px] grid grid-cols-2 gap-[16px] md:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="mt-[80px] text-center text-[16px] text-[#84858C]">
          검색 결과가 없습니다
        </div>
      ) : (
        <div className="mt-[24px] grid grid-cols-2 gap-[16px] md:grid-cols-4">
          {activities.map((item) => (
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
      )}

      {!isLoading && (
        <div className="mt-[40px] mb-[200px]">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
