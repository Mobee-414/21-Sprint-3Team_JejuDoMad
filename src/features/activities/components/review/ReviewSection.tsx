"use client";

import { useState, useEffect } from "react";
import ReviewHeader from "./ReviewHeader";
import ReviewList from "./ReviewList";
import ReviewPagination from "./ReviewPagination";
import { useActivityReviews } from "../../hooks/useActivityReviews";
import ReviewSkeleton from "@/components/skeleton/reviewSkeleton";
import { toast } from "sonner";

const PAGE_SIZE = 3;

type Props = {
  activityId: number;
};

export default function ReviewSection({ activityId }: Props) {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useActivityReviews(activityId, {
    page,
    size: PAGE_SIZE,
  });

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 1;

  useEffect(() => {
    if (error) {
      toast.error("리뷰를 불러오지 못했어요");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="mt-10 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ReviewSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mb-40">
      <section className="mt-10">
        <ReviewHeader
          averageRating={data.averageRating}
          totalCount={data.totalCount}
        />

        <div className="mt-6">
          <ReviewList reviews={data.reviews ?? []} />
        </div>

        <div className="mt-6">
          <ReviewPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </section>
    </div>
  );
}
