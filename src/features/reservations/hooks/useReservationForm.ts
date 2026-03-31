"use client";

import { useMemo, useState } from "react";
import type { Schedule } from "../types/reservation.schema";

interface UseReservationFormParams {
  price: number;
  schedules: Schedule[];
  initialScheduleId?: number;
}

interface UseReservationFormReturn {
  selectedDate: Date | undefined;
  guestCount: number;
  selectedSchedule: Schedule | null;
  availableSchedules: Schedule[];
  totalPrice: number;
  canReserve: boolean;
  handleSelectDate: (date: Date | undefined) => void;
  handleSelectSchedule: (schedule: Schedule) => void;
  decreaseGuest: () => void;
  increaseGuest: () => void;
  isSelectedSchedule: (schedule: Schedule) => boolean;
  setGuestCount: React.Dispatch<React.SetStateAction<number>>;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<Schedule | null>>;
}

function isSameDate(scheduleDate: string, date: Date) {
  const targetDate = new Date(scheduleDate);

  return (
    targetDate.getFullYear() === date.getFullYear() &&
    targetDate.getMonth() === date.getMonth() &&
    targetDate.getDate() === date.getDate()
  );
}

export function useReservationForm({
  price,
  schedules,
}: UseReservationFormParams): UseReservationFormReturn {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  const availableSchedules = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    return schedules.filter((schedule) => {
      return isSameDate(schedule.date, selectedDate);
    });
  }, [schedules, selectedDate]);

  const totalPrice = price * guestCount;

  const canReserve = Boolean(selectedDate && selectedSchedule);

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSchedule(null);
  };

  const handleSelectSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const decreaseGuest = () => {
    setGuestCount((prev) => Math.max(prev - 1, 1));
  };

  const increaseGuest = () => {
    setGuestCount((prev) => Math.min(prev + 1, 50));
  };

  const isSelectedSchedule = (schedule: Schedule) => {
    if (!selectedSchedule) {
      return false;
    }

    return (
      selectedSchedule.date === schedule.date &&
      selectedSchedule.startTime === schedule.startTime &&
      selectedSchedule.endTime === schedule.endTime
    );
  };

  return {
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
    isSelectedSchedule,
    setGuestCount,
    setSelectedSchedule,
  };
}
