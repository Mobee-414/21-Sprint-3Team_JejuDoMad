"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-[40px] flex justify-center gap-[8px]">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="rounded-[6px] px-[12px] py-[8px]"
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={cn(
            "rounded-[6px] px-[12px] py-[8px] text-[14px]",
            currentPage === page ? "bg-black text-white" : "hover:bg-gray-100",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="rounded-[6px] px-[12px] py-[8px]"
      >
        {">"}
      </button>
    </div>
  );
}
