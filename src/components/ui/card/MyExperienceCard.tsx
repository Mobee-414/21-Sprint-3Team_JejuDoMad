"use client";

import Link from "next/link";
import { MyActivity } from "./types";
import Image from "next/image";

export default function MyExperienceCard({
  id,
  userId,
  title,
  description,
  category,
  price,
  address,
  bannerImageUrl,
  subImages,
  schedules,
  reviewCount,
  rating,
  createdAt,
  updatedAt,
}: MyActivity) {
  return (
    <div className="flex w-full justify-between rounded-3xl bg-white p-6 shadow">
      <div className="flex flex-col gap-2.5 lg:gap-3">
        <h1 className="text-16 lg:text-18 font-bold">{title}</h1>
        <div className="flex gap-0.5">
          <Image
            src="/images/icons/star.svg"
            width={20}
            height={20}
            alt="별 아이콘"
            className="mr-[3px] h-4 w-4 md:mr-[5px] md:h-5 md:w-5"
          />
          <span className="text-13 lg:text-16 text-gray-500">{rating}</span>
          <span className="text-13 lg:text-16 text-gray-500">
            ({reviewCount})
          </span>
        </div>
        <h2 className="text-16 lg:text-18 font-bold">
          &#8361; {price.toLocaleString()}{" "}
          <span className="text-14 lg:text-16 text-gray-400">/ 인</span>
        </h2>
        <div className="mt-auto flex w-full gap-2">
          <Link href={`/myUpdateExperiences/${id}`} className="flex flex-1">
            <button className="text-14 lg:text-16 w-full rounded-[8px] bg-gray-50 px-[10px] py-[6px] font-medium">
              수정하기
            </button>
          </Link>

          <button className="text-14 lg:text-16 flex-1 rounded-[8px] bg-gray-50 px-[10px] py-[6px] font-medium">
            삭제하기
          </button>
        </div>
      </div>
      <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-3xl lg:h-[142px] lg:w-[142px]">
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
