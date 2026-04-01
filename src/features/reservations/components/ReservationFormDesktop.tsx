"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useReservationForm } from "../hooks/useReservationForm";
import type { Schedule } from "../types/myReservation.schema";
import { CreateReservationParams } from "@/features/activities/api/createReservation";
import { createDisabledDate } from "@/features/reservations/utils/reservationCalendar.utils";
import {
  isMaxGuestCount,
  isMinGuestCount,
} from "../utils/reservationGuest.utils";

interface ReservationFormDesktopProps {
  price: number;
  schedules: Schedule[];
  onSubmitReservation: (params: CreateReservationParams) => void;
  isPending: boolean;
}

export default function ReservationFormDesktop({
  price,
  schedules,
  onSubmitReservation,
  isPending,
}: ReservationFormDesktopProps) {
  const {
    selectedDate,
    guestCount,
    selectedSchedule,
    availableSchedules,
    totalPrice,
    canReserve,
    handleSelectDate,
    handleSelectSchedule,
    decreaseGuest,
    increaseGuest,
  } = useReservationForm({
    price,
    schedules,
  });
  const disabledDate = createDisabledDate(schedules);
  const isDisabled = !canReserve || isPending;
  const hasAvailableSchedules = availableSchedules.length > 0;

  const handleSubmit = () => {
    if (!selectedSchedule) return;

    onSubmitReservation({
      scheduleId: selectedSchedule.id,
      headCount: guestCount,
    });
  };

  return (
    <div className="flex min-h-[856px] w-[410px] flex-col gap-[24px] rounded-[24px] border border-border bg-card p-[30px] shadow-sm">
      <section className="flex items-end gap-[4px]">
        <span className="text-24-b text-foreground">
          ₩ {price.toLocaleString()}
        </span>
        <span className="text-24-b text-muted-foreground">/ 인</span>
      </section>

      <section className="flex flex-col gap-[8px]">
        <span className="text-16-b text-foreground">날짜</span>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelectDate}
          disabled={disabledDate}
          className="rounded-[6px] border border-border p-0"
          modifiers={{ todayHighlight: new Date() }}
          size="md"
        />
      </section>

      <section className="flex items-center justify-between">
        <p className="text-16-b text-foreground">참여 인원 수</p>

        <div className="flex h-[40px] w-[140px] items-center justify-between rounded-[24px] border border-border px-[9px]">
          <button
            type="button"
            onClick={decreaseGuest}
            disabled={!hasAvailableSchedules || isMinGuestCount(guestCount)}
            className={cn(
              "h-[40px] w-[40px] rounded-[6px] p-[10px]",
              !hasAvailableSchedules || isMinGuestCount(guestCount)
                ? "cursor-not-allowed text-muted-foreground opacity-40"
                : "cursor-pointer text-foreground",
            )}
          >
            −
          </button>

          <span className="w-[40px] text-center leading-[40px]">
            {guestCount}
          </span>

          <button
            type="button"
            onClick={increaseGuest}
            disabled={!hasAvailableSchedules || isMaxGuestCount(guestCount)}
            className={cn(
              "h-[40px] w-[40px] rounded-[6px] p-[10px]",
              !hasAvailableSchedules || isMaxGuestCount(guestCount)
                ? "cursor-not-allowed text-muted-foreground opacity-40"
                : "cursor-pointer text-foreground",
            )}
          >
            +
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-[14px]">
        <p className="text-16-b text-foreground">예약 가능한 시간</p>

        <div className="flex flex-col gap-[12px]">
          {availableSchedules.length > 0 ? (
            availableSchedules.map((schedule) => {
              const isSelected =
                selectedSchedule?.date === schedule.date &&
                selectedSchedule?.startTime === schedule.startTime &&
                selectedSchedule?.endTime === schedule.endTime;

              return (
                <button
                  key={`${schedule.date}-${schedule.startTime}-${schedule.endTime}`}
                  type="button"
                  onClick={() => handleSelectSchedule(schedule)}
                  className={cn(
                    "cursor-pointer rounded-[6px] border px-[16px] py-[12px] text-left",
                    isSelected && "border-primary bg-primary/10",
                  )}
                >
                  {schedule.startTime} - {schedule.endTime}
                </button>
              );
            })
          ) : (
            <div className="flex w-fit items-center justify-center rounded-[6px] border border-border px-[10px] py-[10px]">
              <p className="text-16-m whitespace-nowrap text-muted-foreground">
                예약 가능한 시간이 없습니다
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="flex w-full items-center justify-between border-t border-border pt-[20px] pb-[10px]">
        <div className="flex items-center gap-[6px]">
          <span className="text-20-m text-muted-foreground">총 합계</span>
          <span className="text-20-b text-foreground">
            ₩ {totalPrice.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={cn(
            "h-[50px] min-w-[135px] rounded-[14px] px-[24px] py-[14px] text-16-b",
            isDisabled
              ? "cursor-not-allowed bg-primary text-primary-foreground opacity-50"
              : "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          예약하기
        </button>
      </section>
    </div>
  );
}
