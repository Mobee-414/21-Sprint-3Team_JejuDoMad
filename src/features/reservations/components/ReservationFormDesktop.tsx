"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useReservationForm } from "../hooks/useReservationForm";
import type { Schedule } from "../types/reservation.schema";

interface ReservationFormDesktopProps {
  price: number;
  schedules: Schedule[];
}

export default function ReservationFormDesktop({
  price,
  schedules,
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

  return (
    <div className="flex min-h-[856px] w-[410px] flex-col gap-[24px] rounded-[24px] border border-border bg-card p-[30px] shadow-sm">
      <section className="flex items-end gap-[4px]">
        <span className="text-24-b text-foreground">
          ₩ {price.toLocaleString()}
        </span>
        <span className="text-20-m text-muted-foreground">/ 인</span>
      </section>

      <section className="flex flex-col gap-[8px]">
        <span className="text-16-b text-foreground">날짜</span>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelectDate}
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
            disabled={guestCount <= 1}
            className="h-[40px] w-[40px] cursor-pointer rounded-[6px] p-[10px]"
          >
            −
          </button>

          <span className="w-[40px] text-center leading-[40px]">
            {guestCount}
          </span>

          <button
            type="button"
            onClick={increaseGuest}
            disabled={guestCount >= 50}
            className="h-[40px] w-[40px] cursor-pointer rounded-[6px] p-[10px]"
          >
            +
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-[14px]">
        <p className="text-16-b text-foreground">예약 가능한 시간</p>

        <div className="flex flex-col gap-[12px]">
          {availableSchedules.map((schedule) => {
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
          })}
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
          disabled={!canReserve}
          className="h-[50px] min-w-[135px] cursor-pointer rounded-[14px] bg-primary px-[24px] py-[14px] text-16-b text-primary-foreground disabled:opacity-50"
        >
          예약하기
        </button>
      </section>
    </div>
  );
}
