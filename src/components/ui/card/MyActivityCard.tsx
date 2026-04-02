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
import { AxiosError } from "axios";
import { useState } from "react";

export default function MyActivityCard({
  id,
  title,
  price,
  bannerImageUrl,
  reviewCount,
  rating,
}: MyActivity) {
  const { mutate: deleteActivity, isPending } = useDeleteActivity();

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = () => {
    deleteActivity(id, {
      onSuccess: () => {
        setIsConfirmOpen(false);
        setSuccessMessage("체험 삭제가 완료되었습니다.");
        setIsSuccessOpen(true);
      },
      onError: (error) => {
        setIsConfirmOpen(false);

        const axiosError = error as AxiosError<{ message: string }>;
        const msg =
          axiosError.response?.data?.message || "삭제 중 오류가 발생했습니다.";

        setErrorMessage(msg);
        setIsErrorOpen(true);
      },
    });
  };
  return (
    <div className="flex w-full justify-between rounded-[24px] bg-white p-[24px] shadow">
      <div className="flex flex-col gap-[10px] lg:gap-[12px]">
        <Link href={`/activities/${id}`} className="group/title inline-block">
          <h1 className="text-[16px] font-bold lg:text-[18px]">{title}</h1>
        </Link>
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
            <Button
              variant="outline"
              size="sm"
              className="rounded-x h-[30px] w-full border-gray-300 bg-white text-gray-500 lg:h-[30px]"
            >
              수정하기
            </Button>
          </Link>

          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogTrigger>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-x h-[30px] w-full flex-1 bg-gray-200 text-gray-500 transition-colors hover:bg-gray-100 lg:h-[30px]"
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
                  onClick={handleDelete}
                >
                  네
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
            <DialogContent className="max-w-[327px] md:max-w-[400px]">
              <DialogBody className="py-8 text-center">
                <p className="text-[18px] font-medium text-gray-900">
                  {successMessage}
                </p>
              </DialogBody>
              <DialogFooter>
                <Button
                  className="h-12 w-full rounded-xl font-bold"
                  onClick={() => setIsSuccessOpen(false)}
                >
                  확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isErrorOpen} onOpenChange={setIsErrorOpen}>
            <DialogContent className="max-w-[327px] md:max-w-[400px]">
              <DialogBody className="py-5 text-center">
                <p className="mb-2 text-[18px] font-bold text-gray-900">
                  삭제 실패
                </p>
                <p className="text-[15px] text-gray-600">{errorMessage}</p>
              </DialogBody>
              <DialogFooter>
                <Button
                  className="h-12 w-full rounded-xl"
                  onClick={() => setIsErrorOpen(false)}
                >
                  확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-[24px] lg:h-[142px] lg:w-[142px]">
        <Link
          href={`/activities/${id}`}
          className="absolute inset-0 z-0 block transition-opacity hover:opacity-90"
          aria-label={`${title} 상세 페이지 이동`}
        >
          <Image
            src={bannerImageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 82px, 142px"
            className="object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
