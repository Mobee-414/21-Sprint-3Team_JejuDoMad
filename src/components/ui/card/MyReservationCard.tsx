import { useState } from "react";
import { MyReservationItem } from "@/features/reservations/types/reservation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {StateBadge} from "@/components/ui/badge/StateBadge";
import { reservationStatusMap } from "@/features/reservations/constants/reservationStatusMap";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogIcon,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function MyReservationCard({
  activity,
  scheduleId,
  id,
  teamId,
  userId,
  status,
  reviewSubmitted,
  totalPrice,
  headCount,
  date,
  startTime,
  endTime,
  createdAt,
  updatedAt,
}: MyReservationItem) {
const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const hasButtonUI = status === "pending" || status === "completed";

  const handleCancelClick = () => {
    setIsCancelDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setIsCancelDialogOpen(false);
  }

  const handleConfirmCancel = () => {
    setIsCancelDialogOpen(false);
  }


  return (
    <>
      <div className="text-16 px-2 pb-3 font-bold text-gray-800 lg:hidden">
        {date}
      </div>
      <div className={cn("relative", hasButtonUI && "pb-12.5 lg:pb-0")}>
        <div
          className={`rounded-3xl pr-24.5 shadow-[0px_4px_24px_rgba(156,180,202,0.2)] md:pr-29 lg:pr-38.75`}
        >
          <div className="rounded-3xl shadow-[0px_-8px_20px_rgba(0,0,0,0.05)] lg:relative">
            <Link
              href={``}
              className="relative z-1 block rounded-3xl bg-white p-5 lg:px-10 lg:py-7.5"
            >
              <StateBadge variant={reservationStatusMap[status].variant}>
                {reservationStatusMap[status].label}
              </StateBadge>

              <h4 className="text-14 lg:text-18 mt-2 font-bold break-keep lg:mt-3">
                {activity.title}
              </h4>
              <div className="text-13 lg:text-16 mt-1 font-medium text-gray-500 lg:mt-2.5">
                <span className="hidden lg:mr-1 lg:inline-block">
                  {date}
                  <i className="ml-1 inline-block h-0.5 w-0.5 rounded-full bg-gray-500 align-middle" />
                </span>
                {startTime} - {endTime}
              </div>
              <div className="mt-2 flex items-center gap-1 lg:mt-2.5">
                <strong className="text-16 lg:text-18">
                  &#8361;{totalPrice.toLocaleString()}
                </strong>
                <span className="text-14 lg:text-16 text-gray-400">
                  /{headCount}명
                </span>
              </div>
            </Link>
            <div className="text-14 absolute right-0 bottom-0 left-0 flex h-9.25 gap-3 px-2.25 font-medium text-gray-600 md:px-0 lg:right-10 lg:bottom-7.5 lg:left-auto lg:z-1 lg:h-7.25 lg:gap-2">
              {status === "pending" && (
                <>
                  <button className="flex h-full grow items-center justify-center rounded-xl border border-gray-300 bg-white px-2.5 py-1.5">
                    예약 변경
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancelClick}
                    className="flex h-full grow items-center justify-center rounded-xl bg-gray-50 px-2.5 py-1.5">
                    예약 취소
                  </button>
                </>
              )}
              {status === "completed" && (
                <button
                  className="flex h-full grow items-center justify-center rounded-xl bg-primary px-2.5 py-1.5 text-white"
                  disabled={reviewSubmitted}
                >
                  {reviewSubmitted ? "후기 작성 완료!" : "후기 작성"}
                </button>
              )}
            </div>
          </div>
          <div
            className={cn(
              "absolute top-0 right-0 bottom-0 h-auto w-34 overflow-hidden rounded-r-3xl lg:w-45.25",
              hasButtonUI && "bottom-12.5 lg:bottom-0",
            )}
          >
            <Image
              width={181}
              height={181}
              src={activity.bannerImageUrl}
              alt={activity.title}
              className="block h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="flex flex-col items-center w-[320px] rounded-3xl px-7.5 pt-7.5 pb-6 gap-4 md:w-100 md:h-60.5 md:rounded-[30px] md:gap-6">
         <div className="relative w-[49px] h-[49px] md:w-[88px] md:h-[88px]">
         <Image
            src="/images/icons/modal/visual_warning.svg"
            alt="경고 아이콘" 
            fill
            className="object-cover"
          />
          </div>
          
          <DialogTitle className="text-[16px] font-bold text-center text-gray-950 md:text-[18px]">
            예약을 취소하시겠어요?
          </DialogTitle>

          <DialogFooter className="flex flex-row justify-center w-full gap-3 p-0">
            <div className="flex w-[282px] gap-3">
            <Button
            variant="outline"
            onClick={handleCloseDialog}
            className="h-[41px] flex-1 rounded-[12px] md:h-[47px] md:rounded-[14px]"
            >
              아니요
            </Button>
            <Button
              onClick={handleConfirmCancel}
              className="h-[41px] flex-1 rounded-[12px] md:h-[47px] md:rounded-[14px]"
            >
              취소하기
            </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}
