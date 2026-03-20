"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface ReservationCardProps {
  price: number;
  schedules: Schedule[];
}

export default function ReservationCard({ price, schedules }: ReservationCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [guestCount, setGuestCount] = useState(10);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  const totalPrice = price * guestCount;
  const canReserve = Boolean(selectedDate && selectedSchedule);

  const decreaseGuest = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1);
    }
  };

  const increaseGuest = () => {
    if (guestCount < 50) {
      setGuestCount(guestCount + 1);
    }
  };

  const isSameDate = (scheduleDate: string, date: Date) => {
    const [year, month, day] = scheduleDate.split("-").map(Number);

    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const selectedSchedules = selectedDate
    ? schedules.filter((schedule) => isSameDate(schedule.date, selectedDate))
    : [];

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSchedule(null);
  };

  return (
    <div className="flex min-h-214 w-102.5 flex-col gap-6 rounded-3xl border border-border bg-card p-7.5 shadow-sm">
      <section className="flex items-end gap-1">
        <span className="text-24-b text-foreground">
          ₩ {price.toLocaleString()}
        </span>
        <span className="text-20-m text-muted-foreground">/ 인</span>
      </section>

      <section className="flex flex-col gap-2">
        <span className="text-16-b text-foreground">날짜</span>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelectDate}
          className="rounded-md border border-border p-0"
          modifiers={{ todayHighlight: new Date() }}
          size="md"
        />
      </section>

      <section className="flex items-center justify-between">
        <p className="text-16-b text-foreground">참여 인원 수</p>

        <div className="flex h-10 w-35 items-center justify-between rounded-3xl border border-border px-2.25">
          <button
            type="button"
            onClick={decreaseGuest}
            disabled={guestCount <= 1}
            className="h-10 w-10 rounded-md p-2.5 cursor-pointer"
          >
            −
          </button>

          <span className="w-10 text-center leading-10">{guestCount}</span>

          <button
            type="button"
            onClick={increaseGuest}
            disabled={guestCount >= 50}
            className="h-10 w-10 rounded-md p-2.5 cursor-pointer"
          >
            +
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-3.5">
        <p className="text-16-b text-foreground">예약 가능한 시간</p>

        <div className="flex flex-col gap-3">
          {selectedSchedules.map((schedule) => {
            const isSelected =
              selectedSchedule?.startTime === schedule.startTime;

            return (
              <button
                key={`${schedule.date}-${schedule.startTime}-${schedule.endTime}`}
                type="button"
                onClick={() => setSelectedSchedule(schedule)}
                className={cn(
                  "rounded-md border px-4 py-3 text-left cursor-pointer",
                  isSelected && "border-primary bg-primary/10",
                )}
              >
                {schedule.startTime} - {schedule.endTime}
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex w-full items-center justify-between border-t border-border pt-5 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-20-m text-muted-foreground">총 합계</span>
          <span className="text-20-b text-foreground">
            ₩ {totalPrice.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          disabled={!canReserve}
          className="h-12.5 min-w-33.75 rounded-[14px] bg-primary px-6 py-3.5 text-16-b text-primary-foreground disabled:opacity-50 cursor-pointer"
        >
          예약하기
        </button>
      </section>
    </div>
  );
}
