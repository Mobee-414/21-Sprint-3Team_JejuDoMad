import { MyReservationItem } from "./types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  const hasButtonUI = status === "pending" || status === "completed";
  return (
    <>
      <div className="text-16 px-2 pb-3 font-bold text-gray-800 lg:hidden">
        {date}
      </div>
      <div className={cn("relative", hasButtonUI && "pb-[50px] lg:pb-[0]")}>
        <div
          className={`rounded-3xl pr-[98px] shadow-[0px_4px_24px_rgba(156,180,202,0.2)] md:pr-[116px] lg:pr-[155px]`}
        >
          <div className="rounded-3xl shadow-[0px_-8px_20px_rgba(0,0,0,0.05)] lg:relative">
            <Link
              href={``}
              className="relative z-[1] block rounded-3xl bg-white p-5 lg:px-10 lg:py-[30px]"
            >
              <h4>{status}</h4>
              <h4 className="text-14 lg:text-18 mt-2 font-bold break-keep lg:mt-3">
                {activity.title}
              </h4>
              <div className="text-13 lg:text-16 mt-1 font-medium text-gray-500 lg:mt-[10px]">
                <span className="hidden lg:mr-1 lg:inline-block">
                  {date}
                  <i className="ml-1 inline-block h-[2px] w-[2px] rounded-full bg-gray-500 align-middle" />
                </span>
                {startTime} - {endTime}
              </div>
              <div className="mt-2 flex items-center gap-1 lg:mt-[10px]">
                <strong className="text-16 lg:text-18">
                  &#8361;{totalPrice.toLocaleString()}
                </strong>
                <span className="text-14 lg:text-16 text-gray-400">
                  /{headCount}명
                </span>
              </div>
            </Link>
            <div className="text-14 absolute right-0 bottom-0 left-0 flex h-[37px] gap-3 px-[9px] font-medium text-gray-600 md:px-0 lg:right-10 lg:bottom-[30px] lg:left-auto lg:z-[1] lg:h-[29px] lg:gap-2">
              {status === "pending" && (
                <>
                  <button className="flex h-full grow-1 items-center justify-center rounded-[8px] border border-gray-300 bg-white px-[10px] py-[6px]">
                    예약 변경
                  </button>
                  <button className="flex h-full grow-1 items-center justify-center rounded-[8px] bg-gray-50 px-[10px] py-[6px]">
                    예약 취소
                  </button>
                </>
              )}
              {status === "completed" && (
                <button
                  className="flex h-full grow-1 items-center justify-center rounded-[8px] bg-primary px-[10px] py-[6px] text-white"
                  disabled={reviewSubmitted}
                >
                  {reviewSubmitted ? "후기 작성 완료!" : "후기 작성"}
                </button>
              )}
            </div>
          </div>
          <div
            className={cn(
              "absolute top-0 right-0 bottom-0 h-auto w-[136px] overflow-hidden rounded-r-3xl lg:w-[181px]",
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
    </>
  );
}
