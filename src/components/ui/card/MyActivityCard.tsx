"use client";

import Link from "next/link";
import { MyActivity } from "./types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDeleteActivity } from "@/features/myActivities/hooks/useDeleteActivity";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogIcon,
} from "@/components/ui/dialog";

export default function MyActivityCard({
  id,
  title,
  price,
  bannerImageUrl,
  reviewCount,
  rating,
}: MyActivity) {
  const { mutate: deleteActivity, isPending } = useDeleteActivity();

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
          <Link href={`/mypage/manage/edit/${id}`} className="flex flex-1">
            <Button variant="outline" size="sm" className="w-full">
              수정하기
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 text-red-500"
                disabled={isPending}
              >
                {isPending ? "삭제 중..." : "삭제하기"}
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[327px] md:max-w-[400px]">
              <DialogIcon
                src="/images/icons/modal/visual_warning.svg"
                className="h-[60px] w-[60px] md:h-[88px] md:w-[88px]"
              />
              <DialogBody className="py-5 text-center">
                <p className="text-[16px] font-bold text-gray-900 md:text-[18px]">
                  정말 삭제하시겠습니까?
                </p>
              </DialogBody>

              <DialogFooter className="flex flex-row gap-2">
                <DialogClose className="h-12 flex-1 rounded-xl border border-gray-300 bg-white text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50 md:text-[16px]">
                  아니오
                </DialogClose>

                <Button
                  className="h-12 flex-1 rounded-xl bg-primary text-[14px] font-medium text-white transition-opacity hover:opacity-90 md:text-[16px]"
                  onClick={() => deleteActivity(id)}
                >
                  네
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
