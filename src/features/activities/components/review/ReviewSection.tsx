"use client";

import { useState } from "react";
import ReviewHeader from "./ReviewHeader";
import ReviewList from "./ReviewList";
import ReviewPagination from "./ReviewPagination";
import { useActivityReviews } from "../../hooks/useActivityReviews";

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

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return null;

  return (
    <div className="mb-40">
      <section className="mt-10">
        <ReviewHeader
          averageRating={data.averageRating}
          totalCount={data.totalCount}
        />

        <div className="mt-6">
          <ReviewList reviews={data.reviews} />
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
