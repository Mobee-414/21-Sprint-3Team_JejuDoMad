"use client";

import { useState, useEffect } from "react";
import ReviewHeader from "./ReviewHeader";
import ReviewList from "./ReviewList";
import ReviewPagination from "./ReviewPagination";
import ReviewSkeleton from "@/components/skeleton/reviewSkeleton";

export default function ReviewSection() {
  const [isLoading, setIsLoading] = useState(true);

  //목업: 로딩 흉내
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-40">
      <section className="mt-10">
        <ReviewHeader />

        <div className="mt-6">
          {isLoading ? <ReviewSkeleton /> : <ReviewList />}
        </div>

        <div className="mt-6">{isLoading ? null : <ReviewPagination />}</div>
      </section>
    </div>
  );
}
