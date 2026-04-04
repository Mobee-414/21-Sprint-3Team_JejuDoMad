"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useReservationForm } from "../hooks/useReservationForm";
import { useEffect } from "react";
import useUpdateApplication from "../hooks/useUpdateApplication";
import type { Schedule } from "../types/myReservation.schema";
import { CreateReservationParams } from "@/features/activities/api/createReservation";
import { X } from "lucide-react";
import { createDisabledDate } from "@/features/reservations/utils/reservationCalendar.utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  isMaxGuestCount,
  isMinGuestCount,
} from "../utils/reservationGuest.utils";

interface ReservationFormTabletProps {
  open: boolean;
  onClose: () => void;
  price: number;
  schedules: Schedule[];
  mode?: "create" | "edit";
  reservationId?: number;
  initialScheduleId?: number;
  initialHeadCount?: number;
  onSubmitReservation: (params: CreateReservationParams) => void;
  isPending: boolean;
}

export default function ReservationFormTablet({
  open,
  onClose,
  price,
  schedules,
  mode = "create",
  reservationId,
  initialScheduleId,
  initialHeadCount = 1,
  onSubmitReservation,
  isPending,
}: ReservationFormTabletProps) {
  const {
    selectedDate,
    guestCount,
    selectedSchedule,
    availableSchedules,
    canReserve,
    handleSelectDate,
    handleSelectSchedule,
    decreaseGuest,
    increaseGuest,
    setGuestCount,
  } = useReservationForm({
    price,
    schedules,
    initialScheduleId,
  });

  const updateMutation = useUpdateApplication();
  const disabledDate = createDisabledDate(schedules);
  const isFewSchedules = availableSchedules.length <= 2;
  const isScrollable = availableSchedules.length > 4;
  const isDisabled = !canReserve || isPending || updateMutation.isPending;
  const hasAvailableSchedules = availableSchedules.length > 0;

  const handleSubmit = async () => {
    if (!selectedSchedule) return;

    try {
      if (mode === "edit") {
        const isSameSchedule = selectedSchedule.id === initialScheduleId;
        const isSameGuest = guestCount === initialHeadCount;

        if (isSameSchedule && isSameGuest) return;
        if (!reservationId) return;

        await updateMutation.mutateAsync({
          reservationId,
          scheduleId: selectedSchedule.id,
          headCount: guestCount,
        });
      } else {
        onSubmitReservation({
          scheduleId: selectedSchedule.id,
          headCount: guestCount,
        });
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!open) return;
    if (mode !== "edit" || !initialScheduleId) return;

    const targetSchedule = schedules.find(
      (schedule) => schedule.id === initialScheduleId,
    );

    if (!targetSchedule) return;

    handleSelectDate(new Date(targetSchedule.date));
    handleSelectSchedule(targetSchedule);
    setGuestCount(initialHeadCount);
  }, [open, mode, initialScheduleId, initialHeadCount, schedules]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer rounded-md p-1 text-muted-foreground hover:bg-muted"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="fixed inset-x-0 bottom-0 z-50">
        <div className="mx-auto w-[744px] rounded-t-[24px] border-t border-border bg-card px-[30px] pt-[24px] pb-[18px] shadow-[0_-10px_24px_rgba(156,180,202,0.38)]">
          <div className="flex flex-col">
            <div className="mx-auto w-fit">
              <div className="mb-[12px] flex items-center justify-between">
                <p className="mb-[12px] text-16-b text-foreground">날짜</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer text-14-m text-muted-foreground hover:text-foreground"
                >
                  X
                </button>
              </div>

              <div className="flex items-start gap-[40px]">
                <div className="w-[359px] shrink-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    disabled={disabledDate}
                    className="w-full rounded-[6px] p-0"
                    size="sm"
                  />
                </div>

                <section className="flex w-[260px] flex-col rounded-[6px] bg-background px-[16px] py-[16px]">
                  <p className="text-16-b text-foreground">예약 가능한 시간</p>

                  <ScrollArea
                    className={cn(
                      "mt-[10px]",
                      isScrollable ? "h-[160px]" : "h-auto",
                    )}
                  >
                    <div className="px-[12px]">
                      {availableSchedules.length > 0 ? (
                        <div
                          className={cn(
                            "flex flex-col",
                            isFewSchedules ? "gap-[6px]" : "gap-[8px]",
                          )}
                        >
                          {availableSchedules.map((schedule) => {
                            const isSelected =
                              selectedSchedule?.date === schedule.date &&
                              selectedSchedule?.startTime ===
                                schedule.startTime &&
                              selectedSchedule?.endTime === schedule.endTime;

                            return (
                              <button
                                key={`${schedule.date}-${schedule.startTime}-${schedule.endTime}`}
                                type="button"
                                onClick={() => handleSelectSchedule(schedule)}
                                className={cn(
                                  "h-[36px] w-full cursor-pointer rounded-[8px] border border-border px-[12px] text-13-m text-foreground",
                                  isSelected &&
                                    "border-primary bg-primary/10 text-primary",
                                )}
                              >
                                {schedule.startTime} - {schedule.endTime}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex w-fit items-center justify-center rounded-[6px] border border-border px-[10px] py-[10px]">
                          <p className="text-16-m whitespace-nowrap text-muted-foreground">
                            예약 가능한 시간이 없습니다.
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="mt-[16px]">
                    <p className="mb-[8px] text-14-b text-foreground">
                      참여 인원 수
                    </p>

                    <div className="flex h-[36px] items-center justify-between rounded-[24px] border border-border px-[10px]">
                      <button
                        type="button"
                        onClick={decreaseGuest}
                        disabled={
                          !hasAvailableSchedules || isMinGuestCount(guestCount)
                        }
                        className={cn(
                          "h-[40px] w-[40px] rounded-[6px] p-[10px]",
                          !hasAvailableSchedules || isMinGuestCount(guestCount)
                            ? "cursor-not-allowed text-muted-foreground opacity-40"
                            : "cursor-pointer text-foreground",
                        )}
                      >
                        −
                      </button>

                      <span className="text-14-m text-foreground">
                        {guestCount}
                      </span>

                      <button
                        type="button"
                        onClick={increaseGuest}
                        disabled={
                          !hasAvailableSchedules || isMaxGuestCount(guestCount)
                        }
                        className={cn(
                          "h-[40px] w-[40px] rounded-[6px] p-[10px] focus:ring-0 focus:outline-none active:bg-transparent",
                          !hasAvailableSchedules || isMaxGuestCount(guestCount)
                            ? "cursor-not-allowed text-muted-foreground opacity-40"
                            : "cursor-pointer text-foreground",
                        )}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isDisabled}
              className={cn(
                "mt-[24px] h-[44px] w-full rounded-[12px] bg-primary text-14-b text-primary-foreground",
                isDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-primary/90",
              )}
            >
              {mode === "edit" ? "예약 변경" : "예약하기"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
