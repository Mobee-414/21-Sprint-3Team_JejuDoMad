"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAvailableSchedule } from "@/features/activities/hooks/useAvailableSchedule";
import { useCreateReservation } from "@/features/activities/hooks/useCreateReservation";
import { useMe } from "@/features/mypage/users/hooks/useMe";

interface SelectedSchedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface Props {
  activityId: number;
  price: number;
}

export default function ActivityReservationForm({ activityId, price }: Props) {
  const router = useRouter();
  const { data: me } = useMe();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(String(today.getFullYear()));
  const [currentMonth, setCurrentMonth] = useState(
    String(today.getMonth() + 1).padStart(2, "0"),
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [guestCount, setGuestCount] = useState(1);
  const [selectedSchedule, setSelectedSchedule] =
    useState<SelectedSchedule | null>(null);

  const { data: availableSchedules } = useAvailableSchedule(activityId, {
    year: currentYear,
    month: currentMonth,
  });

  const totalPrice = price * guestCount;
  const canReserve = Boolean(selectedDate && selectedSchedule);

  const handleMonthChange = (date: Date) => {
    setCurrentYear(String(date.getFullYear()));
    setCurrentMonth(String(date.getMonth() + 1).padStart(2, "0"));
    setSelectedDate(undefined);
    setSelectedSchedule(null);
  };

  const isSameDate = (scheduleDate: string, date: Date) => {
    const [year, month, day] = scheduleDate.split("-").map(Number);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const selectedTimes =
    selectedDate && availableSchedules
      ? availableSchedules
          .filter((s) => isSameDate(s.date, selectedDate))
          .flatMap((s) => s.times.map((t) => ({ ...t, date: s.date })))
      : [];

  const availableDates = availableSchedules?.map((s) => s.date) ?? [];
  const isDateAvailable = (date: Date) =>
    availableDates.some((d) => isSameDate(d, date));

  const { mutate: reserve, isPending } = useCreateReservation(activityId);

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
          onSelect={(date) => {
            setSelectedDate(date);
            setSelectedSchedule(null);
          }}
          onMonthChange={handleMonthChange}
          disabled={(date) => !isDateAvailable(date)}
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
            onClick={() => setGuestCount((prev) => Math.max(prev - 1, 1))}
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
            disabled={!canReserve || isPending}
            onClick={() => {
              if (!me) return router.push("/login");
              if (!selectedSchedule) return;
              reserve({
                scheduleId: selectedSchedule.id,
                headCount: guestCount,
              });
            }}
            className="h-[50px] min-w-[135px] cursor-pointer rounded-[14px] bg-primary px-[24px] py-[14px] text-16-b text-primary-foreground disabled:opacity-50"
          >
            {isPending ? "예약 중..." : "예약하기"}
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-[14px]">
        <p className="text-16-b text-foreground">예약 가능한 시간</p>
        <div className="flex flex-col gap-[12px]">
          {selectedTimes.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {selectedDate
                ? "예약 가능한 시간이 없습니다."
                : "날짜를 선택해주세요."}
            </p>
          )}
          {selectedTimes.map((time) => (
            <button
              key={time.id}
              type="button"
              onClick={() => setSelectedSchedule(time)}
              className={cn(
                "cursor-pointer rounded-[6px] border px-[16px] py-[12px] text-left",
                selectedSchedule?.id === time.id &&
                  "border-primary bg-primary/10",
              )}
            >
              {time.startTime} - {time.endTime}
            </button>
          ))}
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
          disabled={!canReserve || isPending}
          onClick={() => {
            if (!me) return router.push("/login");
            if (!selectedSchedule) return;
            reserve({
              scheduleId: selectedSchedule.id,
              headCount: guestCount,
            });
          }}
          className="h-[50px] min-w-[135px] cursor-pointer rounded-[14px] bg-primary px-[24px] py-[14px] text-16-b text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "예약 중..." : "예약하기"}
        </button>
      </section>
    </div>
  );
}
