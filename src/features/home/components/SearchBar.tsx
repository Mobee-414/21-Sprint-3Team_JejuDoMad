"use client";

import Image from "next/image";
import Search from "public/images/icons/search.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const urlKeyword = searchParams.get("keyword") ?? "";

  const [keyword, setKeyword] = useState(urlKeyword);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!urlKeyword) {
      setKeyword("");
    }
  }, [urlKeyword]);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    router.replace(`/?keyword=${encodeURIComponent(trimmed)}`, {
      scroll: false,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex h-[53px] w-full max-w-[calc(100%-80px)] cursor-text items-center justify-between rounded-[16px] border bg-white py-[6px] pr-[8px] pl-[20px] md:h-[70px] md:rounded-[24px] md:py-[10px] md:pr-[12px] md:pl-[32px] xl:max-w-[1040px]"
    >
      <div className="flex min-w-0 flex-1 items-center gap-[12px]">
        <Image
          src={Search}
          alt="검색"
          width={20}
          height={20}
          className="shrink-0 md:h-[24px] md:w-[24px]"
        />
        <Input
          ref={inputRef}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          placeholder="내가 원하는 체험은"
          className="h-[41px] min-w-0 flex-1 cursor-text border-0 p-0 !text-[#1b1b1d] shadow-none placeholder:text-[16px] placeholder:font-medium placeholder:tracking-[-0.025em] placeholder:text-[#84858C] focus-visible:ring-0 md:h-[50px] md:text-[18px] md:placeholder:text-[18px] [&:-webkit-autofill]:shadow-[0_0_0px_1000px_white_inset]"
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
