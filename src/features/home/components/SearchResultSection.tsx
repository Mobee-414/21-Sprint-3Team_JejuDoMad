"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/card/card";
import Pagination from "@/features/activities/components/Pagination";
import { useActivities } from "@/features/activities/hooks/useActivities";
import { usePageSize } from "@/features/activities/hooks/usePageSize";
import CardSkeleton from "@/components/skeleton/cardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Props {
  keyword: string;
}

export default function SearchResultSection({ keyword }: Props) {
  const PAGE_SIZE = usePageSize();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useActivities({
    method: "offset",
    page,
    size: PAGE_SIZE,
    sort: "latest",
    keyword,
  });

  const showSkeleton = isLoading || isFetching;

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  useEffect(() => {
    if (error) {
      toast.error("데이터를 불러오는데 실패했어요");
    }
  }, [error]);

  return (
    <div className="mx-auto mt-[80px] max-w-[1120px]">
      {showSkeleton ? (
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

      {showSkeleton ? (
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

      {!showSkeleton && (
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
