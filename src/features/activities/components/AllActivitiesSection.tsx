"use client";

import { useState } from "react";
import Card from "@/components/ui/card/card";
import ThemeFilter from "./CategoryFilter";
import PriceSortDropdown from "./PriceSortDropdown";
import Pagination from "./Pagination";
import { useActivities } from "../hooks/useActivities";
import { usePageSize } from "../hooks/usePageSize";

export default function AllActivitiesSection() {
  const PAGE_SIZE = usePageSize();
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useActivities({
    method: "offset",
    page,
    size: PAGE_SIZE,
    category,
    sort,
  });

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 1;

  const handleCategoryChange = (newCategory: string | undefined) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleSortChange = (newSort: string | undefined) => {
    setSort(newSort);
    setPage(1);
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="mx-auto mt-[80px] max-w-[1120px]">
      <h2 className="text-[20px] font-bold"> 모든 체험</h2>

      <div className="mt-[24px] flex items-center justify-between">
        <ThemeFilter selected={category} onSelect={handleCategoryChange} />
        <PriceSortDropdown selected={sort} onSelect={handleSortChange} />
      </div>

      <div className="mt-[24px] grid grid-cols-2 gap-[16px] md:grid-cols-4">
        {data?.activities.map((item) => (
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

      <div className="mt-[40px] mb-[200px]">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
