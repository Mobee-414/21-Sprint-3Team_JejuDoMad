import { useState } from "react";
import { MyReservationItem } from "@/features/reservations/types/reservation.schema";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { StateBadge } from "@/components/ui/badge/StateBadge";
import { reservationStatusMap } from "@/features/reservations/constants/reservationStatus";
import ConfirmDialog from "@/components/ui/dialog/ConfirmDialog";

interface MyReservationCardProps extends MyReservationItem {
  onClickReview?: () => void;
  onCancel?: () => void;
}
export default function MyReservationCard({
  activity,
  status,
  reviewSubmitted,
  totalPrice,
  headCount,
  date,
  startTime,
  endTime,
  onClickReview,
  onCancel,
}: MyReservationCardProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const hasButtonUI = status === "pending" || status === "completed";

  const handleCancelClick = () => {
    setIsCancelDialogOpen(true);
  };

  const handleCancelReservation = () => {
    onCancel?.();
    setIsCancelDialogOpen(false);
  };

  return (
    <>
      <div className="text-16 px-[8px] pb-[12px] font-bold text-gray-800 lg:hidden">
        {date}
      </div>
      <div className={cn("relative", hasButtonUI && "pb-[48px] lg:pb-0")}>
        <div className="rounded-[24px] pr-[88px] shadow-[0px_4px_24px_rgba(156,180,202,0.2)] md:pr-[116px] lg:pr-[155px]">
          <div className="rounded-[24px] shadow-[0px_-8px_20px_rgba(0,0,0,0.05)] lg:relative">
            <Link
              href={``}
              className="relative z-[1] block rounded-[24px] bg-white p-[20px] lg:px-[40px] lg:py-[30px]"
            >
              <StateBadge variant={reservationStatusMap[status].variant}>
                {reservationStatusMap[status].label}
              </StateBadge>

              <h4 className="mt-[8px] overflow-hidden text-[14px] font-bold text-ellipsis whitespace-nowrap lg:mt-[12px] lg:text-[18px]">
                {activity.title}
              </h4>
              <div className="mt-[4px] text-[13px] font-medium text-gray-500 lg:mt-[10px] lg:text-[16px]">
                <span className="hidden lg:mr-[4px] lg:inline-block">
                  {date}
                  <i className="ml-[4px] inline-block h-[2px] w-[2px] rounded-full bg-gray-500 align-middle" />
                </span>
                {startTime} - {endTime}
              </div>
              <div className="mt-[8px] flex items-center gap-[4px] lg:mt-[10px]">
                <strong className="text-[16px] lg:text-[18px]">
                  &#8361;{totalPrice.toLocaleString()}
                </strong>
                <span className="text-[14px] text-gray-400 lg:text-[16px]">
                  /{headCount}명
                </span>
              </div>
            </Link>
            <div className="text-14 absolute right-0 bottom-0 left-0 flex h-[36px] gap-[12px] px-[8px] font-medium text-gray-600 md:px-0 lg:right-[40px] lg:bottom-[30px] lg:left-auto lg:z-[1] lg:h-[29px] lg:gap-[8px]">
              {status === "pending" && (
                <>
                  <button className="flex h-full grow items-center justify-center rounded-[12px] border border-gray-300 bg-white px-[10px] py-[6px]">
                    예약 변경
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="flex h-full grow items-center justify-center rounded-[12px] bg-gray-50 px-[10px] py-[6px]"
                  >
                    예약 취소
                  </button>
                </>
              )}
              {status === "completed" && (
                <button
                  type="button"
                  onClick={onClickReview}
                  className="flex h-full grow cursor-pointer items-center justify-center rounded-[12px] bg-primary px-[10px] py-[6px] text-white"
                  disabled={reviewSubmitted}
                >
                  {reviewSubmitted ? "후기 작성 완료!" : "후기 작성"}
                </button>
              )}
            </div>
          </div>
          <div
            className={cn(
              "absolute top-0 right-0 bottom-0 h-auto w-[128px] overflow-hidden rounded-r-[24px] md:w-[136px] lg:w-[181px]",
              hasButtonUI && "bottom-[50px] lg:bottom-0",
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
      <ConfirmDialog
        open={isCancelDialogOpen}
        title="예약을 취소하시겠어요?"
        confirmText="취소하기"
        cancelText="아니요"
        onCancel={() => setIsCancelDialogOpen(false)}
        onConfirm={handleCancelReservation}
      />
    </>
  );
}
