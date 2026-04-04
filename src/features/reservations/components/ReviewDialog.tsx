"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  activityTitle: string;
  reviewDate: string;
  reviewTime: string;
  participantCount: number;
  onSubmit: (value: { rating: number; content: string }) => void;
  isPending?: boolean;
}

const MAX_CONTENT_LENGTH = 100;

export default function ReviewDialog({
  open,
  onOpenChange,
  activityTitle,
  reviewDate,
  reviewTime,
  participantCount,
  onSubmit,
  isPending = false,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const isSubmitDisabled = rating === 0 || !content.trim() || isPending;

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = e.target.value;

    if (nextValue.length > MAX_CONTENT_LENGTH) {
      setContent(nextValue.slice(0, MAX_CONTENT_LENGTH));
      return;
    }

    setContent(nextValue);
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    onSubmit({
      rating,
      content: content.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-40px)] max-w-[327px] rounded-[30px] bg-white px-6 py-5 shadow-none md:max-w-[385px] md:px-[30px] md:py-6">
        <div className="flex flex-col gap-5 md:gap-[30px]">
          <div className="flex flex-col gap-2 md:gap-1">
            <div className="flex justify-end">
              <DialogClose>
                <img
                  src="/images/icons/icon_delete.svg"
                  alt="닫기"
                  className="h-6 w-6"
                />
              </DialogClose>
            </div>

            <div className="flex flex-col items-center gap-[6px] md:gap-1">
              <h2 className="text-center text-[14px] font-bold text-[#111211] md:text-[16px]">
                {activityTitle}
              </h2>

              <div className="flex items-center gap-1 text-[13px] font-medium text-[#84858C] md:text-[14px]">
                <span>{reviewDate}</span>
                <span>/</span>
                <span>{reviewTime}</span>
                <span>({participantCount}명)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-[6px] md:gap-3">
            {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index + 1;
              const isActive = starValue <= rating;

              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => setRating(starValue)}
                  aria-label={`${starValue}점 선택`}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center md:h-[42px] md:w-[42px]"
                >
                  <img
                    src={
                      isActive
                        ? "/images/icons/icon_star_on.svg"
                        : "/images/icons/icon_star_off.svg"
                    }
                    alt=""
                    className="h-9 w-9 md:h-[42px] md:w-[42px]"
                  />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <h3 className="text-[16px] font-bold text-black md:text-[18px]">
              소중한 경험을 들려주세요
            </h3>

            <div className="rounded-[12px] border border-[#E0E0E5] bg-white px-5 py-5 shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
              <textarea
                value={content}
                onChange={handleChangeContent}
                placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
                className="h-[111px] w-full resize-none bg-transparent text-[14px] leading-[180%] text-[#111211] outline-none placeholder:text-[#9FA0A7] md:h-[103px] md:text-[16px]"
              />

              <div className="mt-2 flex justify-end text-[13px] text-[#707177] md:text-[14px]">
                {content.length}/{MAX_CONTENT_LENGTH}
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="h-[41px] w-full rounded-[12px] md:h-[54px] md:rounded-[16px]"
          >
            작성하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
