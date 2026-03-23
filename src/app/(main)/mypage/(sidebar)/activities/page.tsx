"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import MyActivityCard from "@/components/ui/card/MyActivityCard";
import { cn } from "@/lib/utils";

export default function MyActivitiesPage() {
  const myActivities = [
    {
      id: 1,
      userId: 123,
      title: "함께 배우면 즐거운 스트릿 댄스",
      description: "재미있는 댄스 수업",
      category: "스포츠",
      price: 10000,
      address: "서울시 강남구",
      bannerImageUrl: "https://picsum.photos/seed/picsum/400/400",
      subImages: [],
      schedules: [],
      reviewCount: 293,
      rating: 4.9,
      createdAt: "2024-03-19",
      updatedAt: "2024-03-19",
    },
    {
      id: 2,
      userId: 125,
      title: "함께 배우면 즐거운 스트릿 댄스",
      description: "재미있는 댄스 수업",
      category: "스포츠",
      price: 50000,
      address: "서울시 강남구",
      bannerImageUrl: "https://picsum.photos/seed/picsum/400/400",
      subImages: [],
      schedules: [],
      reviewCount: 23,
      rating: 4.1,
      createdAt: "2024-03-19",
      updatedAt: "2024-03-19",
    },
  ];

  return (
    <section className="flex flex-col gap-[24px] py-[16px]">
      <div className="flex w-full flex-row items-center justify-between gap-[16px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
          <h3 className="truncate text-18-b text-foreground lg:text-32-b">
            내 체험 관리
          </h3>
          <p className="line-clamp-1 text-14-m break-keep text-muted-foreground">
            내 체험 관리 아래에 체험을 등록하거나 수정 및 삭제가 가능합니다.
          </p>
        </div>

        <Link
          href="/mypage/manage/register"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "shrink-0 px-[12px] py-[16px] text-white sm:w-[144px] sm:px-[24px] sm:py-[24px]",
            "text-[14px] sm:text-[16px]",
          )}
        >
          체험 등록하기
        </Link>
      </div>

      <div className="flex flex-col gap-[16px] lg:gap-[24px]">
        {myActivities.length > 0 ? (
          myActivities.map((activity) => (
            <MyActivityCard key={activity.id} {...activity} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-[80px] text-gray-400">
            <p>아직 등록한 체험이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
