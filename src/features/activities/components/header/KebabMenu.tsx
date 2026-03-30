"use client";

import { useState, useRef, useEffect } from "react";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function KebabMenu({ onEdit, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
      >
        ⋮
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-[120px] overflow-hidden rounded-[6px] border border-gray-200 bg-white shadow-md">
          <button
            type="button"
            onClick={() => {
              onEdit?.();
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete?.();
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
