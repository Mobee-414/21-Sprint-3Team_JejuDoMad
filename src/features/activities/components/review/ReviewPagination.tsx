"use client";

import { cn } from "@/lib/utils";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ReviewPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="rounded-md px-3 py-2 disabled:opacity-30"
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "rounded-md px-3 py-2 text-sm",
            currentPage === page ? "bg-black text-white" : "hover:bg-gray-100",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="rounded-md px-3 py-2"
      >
        {">"}
      </button>
    </div>
  );
}
