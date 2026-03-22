"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ReviewPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex justify-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="rounded-md px-3 py-2"
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={cn(
            "rounded-md px-3 py-2 text-sm",
            currentPage === page ? "bg-black text-white" : "hover:bg-gray-100",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="rounded-md px-3 py-2"
      >
        {">"}
      </button>
    </div>
  );
}
