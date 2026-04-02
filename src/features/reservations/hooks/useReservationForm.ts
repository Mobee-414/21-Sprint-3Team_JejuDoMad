"use client";

import { useMemo, useState } from "react";
import type { Schedule } from "../types/myReservation.schema";
import { getSchedulesByDate } from "../utils/reservationCalendar.utils";
import {
  getNextGuestCount,
  getPrevGuestCount,
} from "../utils/reservationGuest.utils";

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

export function useReservationForm({
  price,
  schedules,
}: UseReservationFormParams): UseReservationFormReturn {
  const today = new Date();
  const todaySchedules = getSchedulesByDate(schedules, today);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    todaySchedules.length > 0 ? today : undefined,
  );
  const [guestCount, setGuestCount] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  const availableSchedules = useMemo(() => {
    return getSchedulesByDate(schedules, selectedDate ?? today);
  }, [schedules, selectedDate, today]);

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
    setGuestCount((prev) => getPrevGuestCount(prev));
  };

  const increaseGuest = () => {
    setGuestCount((prev) => getNextGuestCount(prev));
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
