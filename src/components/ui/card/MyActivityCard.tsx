"use client";

import Link from "next/link";
import { MyActivity } from "./types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MyExperienceCard({
  id,
  title,
  price,
  bannerImageUrl,
  reviewCount,
  rating,
}: MyActivity) {
  return (
    <div className="flex w-full justify-between rounded-[24px] bg-white p-[24px] shadow">
      <div className="flex flex-col gap-[10px] lg:gap-[12px]">
        <h1 className="text-[16px] font-bold lg:text-[18px]">{title}</h1>
        <div className="flex gap-[2px]">
          <Image
            src="/images/icons/icon_star_on.svg"
            width={20}
            height={20}
            alt="별 아이콘"
            className="mr-[3px] h-[16px] w-[16px] md:mr-[5px] md:h-[20px] md:w-[20px]"
          />
          <span className="text-[13px] text-gray-500 lg:text-[16px]">
            {rating}
          </span>
          <span className="text-[13px] text-gray-500 lg:text-[16px]">
            ({reviewCount})
          </span>
        </div>
        <h2 className="text-[16px] font-bold lg:text-[18px]">
          &#8361; {price.toLocaleString()}{" "}
          <span className="text-[14px] text-gray-400 lg:text-[16px]">/ 인</span>
        </h2>
        <div className="mt-auto flex w-full gap-[8px]">
          <Link href={`/mypage/activities/edit/${id}`} className="flex flex-1">
            <Button variant="outline" size="sm" className="w-full">
              수정하기
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => alert("삭제하시겠습니까?")}
          >
            삭제하기
          </Button>
        </div>
      </div>
      <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-[24px] lg:h-[142px] lg:w-[142px]">
        <Image
          src={bannerImageUrl}
          alt={title}
          fill
          sizes="(max-width: 1024px) 82px, 142px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
