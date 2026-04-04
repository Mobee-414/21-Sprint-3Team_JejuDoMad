"use client";

import { cn } from "@/lib/utils";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-[40px] flex justify-center gap-[8px]">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-[6px] px-[12px] py-[8px] hover:bg-gray-100 disabled:pointer-events-none disabled:text-gray-300"
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "cursor-pointer rounded-[6px] px-[12px] py-[8px] text-[14px] disabled:cursor-default",
            currentPage === page ? "bg-black text-white" : "hover:bg-gray-100",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="cursor-pointer rounded-[6px] px-[12px] py-[8px] hover:bg-gray-100 disabled:pointer-events-none disabled:text-gray-300"
      >
        {">"}
      </button>
    </div>
  );
}
