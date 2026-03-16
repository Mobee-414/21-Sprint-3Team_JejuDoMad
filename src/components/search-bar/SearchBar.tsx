"use client";

import Image from "next/image";
import Search from "public/images/icons/search.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  return (
    <div
      className="
        flex items-center justify-between
        w-full max-w-81.75 h-13.25
        rounded-2xl border bg-white
        py-1.5 pr-2 pl-5

        md:max-w-151 md:h-17.5
        md:rounded-3xl md:py-2.5 md:pr-3 md:pl-8

        xl:max-w-260
      "
    >
      <div className="flex gap-3">
        <Image
          src={Search}
          alt="검색"
          width={20}
          height={20}
          className="md:h-6 md:w-6"
        />
        <Input
          placeholder="내가 원하는 체험은"
          className="h-full border-0 p-0 text-[14px] md:text-[18px] font-medium
          tracking-[-0.025em] text-[#1b1b1d] shadow-none
          focus-visible:ring-0 placeholder:text-[16px]
          md:placeholder:text-[18px] placeholder:font-medium placeholder:tracking-[-0.025em] placeholder:text-[#84858C]
         "
        />
      </div>

      <Button
        className="
          w-21.25 h-10.25
          text-[14px]
          rounded-[12px]

          md:w-30 md:h-12.5
          md:text-[16px]
          md:rounded-[14px]

          font-bold
          tracking-[-0.025em]
          text-white
        "
      >
        검색하기
      </Button>
    </div>
  );
}
