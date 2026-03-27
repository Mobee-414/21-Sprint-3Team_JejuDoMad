"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

type Props = {
  schedules: Schedule[];
};

export default function ActivityCalendar({ schedules }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  const isSameDate = (scheduleDate: string, date: Date) => {
    const [year, month, day] = scheduleDate.split("-").map(Number);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const selectedSchedules = selectedDate
    ? schedules.filter((s) => isSameDate(s.date, selectedDate))
    : [];

  return (
    <div className="rounded-2xl border p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date);
          setSelectedSchedule(null);
        }}
      />
      {selectedSchedules.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm font-bold">예약 가능한 시간</p>
          {selectedSchedules.map((schedule) => (
            <button
              key={`${schedule.date}-${schedule.startTime}`}
              type="button"
              onClick={() => setSelectedSchedule(schedule)}
              className={cn(
                "rounded-[6px] border px-4 py-3 text-left text-sm",
                selectedSchedule?.id === schedule.id &&
                  "border-primary bg-primary/10",
              )}
            >
              {schedule.startTime} - {schedule.endTime}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
