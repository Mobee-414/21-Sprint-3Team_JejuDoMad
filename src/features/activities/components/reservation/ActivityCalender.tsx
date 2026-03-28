"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAvailableSchedule } from "../../hooks/useAvailableSchedule";

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

type Props = {
  activityId: number;
};

export default function ActivityCalendar({ activityId }: Props) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(String(today.getFullYear()));
  const [currentMonth, setCurrentMonth] = useState(
    String(today.getMonth() + 1).padStart(2, "0"),
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  const { data: availableSchedules } = useAvailableSchedule(activityId, {
    year: currentYear,
    month: currentMonth,
  });

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

  const selectedSchedules =
    selectedDate && availableSchedules
      ? availableSchedules
          .filter((s) => isSameDate(s.date, selectedDate))
          .flatMap((s) => s.times.map((t) => ({ ...t, date: s.date })))
      : [];

  const availableDates = availableSchedules?.map((s) => s.date) ?? [];
  const isDateAvailable = (date: Date) =>
    availableDates.some((d) => isSameDate(d, date));

  return (
    <div className="rounded-2xl border p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date);
          setSelectedSchedule(null);
        }}
        onMonthChange={handleMonthChange}
        disabled={(date) => !isDateAvailable(date)}
      />
      {selectedSchedules.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm font-bold">예약 가능한 시간</p>
          {selectedSchedules.map((time) => (
            <button
              key={time.id}
              type="button"
              onClick={() => setSelectedSchedule(time)}
              className={cn(
                "rounded-[6px] border px-4 py-3 text-left text-sm",
                selectedSchedule?.id === time.id &&
                  "border-primary bg-primary/10",
              )}
            >
              {time.startTime} - {time.endTime}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
