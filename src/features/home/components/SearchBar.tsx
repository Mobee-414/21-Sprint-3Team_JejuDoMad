"use client";

import Image from "next/image";
import Search from "public/images/icons/search.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    router.push(`/?keyword=${encodeURIComponent(trimmed)}`, { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex h-[53px] w-full max-w-[327px] items-center justify-between rounded-[16px] border bg-white py-[6px] pr-[8px] pl-[20px] md:h-[70px] md:max-w-[604px] md:rounded-[24px] md:py-[10px] md:pr-[12px] md:pl-[32px] xl:max-w-[1040px]">
      <div className="flex gap-[12px]">
        <Image
          src={Search}
          alt="검색"
          width={20}
          height={20}
          className="md:h-[24px] md:w-[24px]"
        />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="내가 원하는 체험은"
          className="h-full border-0 p-0 text-[14px] font-medium tracking-[-0.025em] text-[#1b1b1d] shadow-none placeholder:text-[16px] placeholder:font-medium placeholder:tracking-[-0.025em] placeholder:text-[#84858C] focus-visible:ring-0 md:text-[18px] md:placeholder:text-[18px]"
        />
      </div>

      <Button
        onClick={handleSearch}
        className="h-[41px] w-[85px] rounded-[12px] text-[14px] font-bold tracking-[-0.025em] text-white md:h-[50px] md:w-[120px] md:rounded-[14px] md:text-[16px]"
      >
        검색하기
      </Button>
    </div>
  );
}
