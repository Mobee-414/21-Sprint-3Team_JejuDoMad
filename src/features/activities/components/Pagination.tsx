"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-10 gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="px-3 py-2 rounded-md"
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={cn(
            "px-3 py-2 rounded-md text-sm",
            currentPage === page
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-3 py-2 rounded-md"
      >
        {">"}
      </button>
    </div>
  );
}