"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useReservationForm } from "../hooks/useReservationForm";
import useUpdateApplication from "../hooks/useUpdateApplication";
import type { Schedule } from "../types/myReservation.schema";
import { CreateReservationParams } from "@/features/activities/api/createReservation";

interface ReservationFormMobileProps {
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

type MobileStep = "select" | "guest" | "summary";

export default function ReservationFormMobile({
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
}: ReservationFormMobileProps) {
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

  const [step, setStep] = useState<MobileStep>("select");
  const updateMutation = useUpdateApplication();

  const totalPrice = useMemo(() => {
    return price * guestCount;
  }, [price, guestCount]);
  useEffect(() => {
    if (!open) return;
    if (mode !== "edit" || !initialScheduleId) return;

    const targetSchedule = schedules.find(
      (schedule) => schedule.id === initialScheduleId,
    );

    if (!targetSchedule) return;

    if (selectedSchedule?.id === initialScheduleId) return;

    handleSelectDate(new Date(targetSchedule.date));
    handleSelectSchedule(targetSchedule);
    setGuestCount(initialHeadCount);
  }, [open, mode, initialScheduleId, schedules]);

  useEffect(() => {
    if (open) setStep("select");
  }, [open]);

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

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="예약 폼 닫기"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/45"
      />

      <div className="fixed inset-x-0 bottom-0 z-50">
        <div className="max-h-[80vh] overflow-y-auto rounded-t-[24px] bg-card px-[20px] pt-[20px] pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[0_-10px_24px_rgba(156,180,202,0.38)]">
          {step === "select" && (
            <div className="flex flex-col">
              <section>
                <div className="mb-[12px] flex items-center justify-between">
                  <p className="mb-[10px] text-14-b text-foreground">날짜</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-14-m text-muted-foreground hover:text-foreground"
                  >
                    X
                  </button>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelectDate}
                  className="w-full rounded-[12px] p-0"
                  size="sm"
                />
              </section>

              {selectedDate && (
                <section className="mt-[16px]">
                  <p className="mb-[10px] text-14-b text-foreground">
                    예약 가능한 시간
                  </p>

                  <div className="flex flex-col gap-[8px]">
                    {availableSchedules.length > 0 ? (
                      availableSchedules.map((schedule) => {
                        const isSelected =
                          selectedSchedule?.date === schedule.date &&
                          selectedSchedule?.startTime === schedule.startTime;

                        return (
                          <button
                            key={`${schedule.date}-${schedule.startTime}`}
                            type="button"
                            onClick={() => handleSelectSchedule(schedule)}
                            className={cn(
                              "flex h-[40px] items-center justify-center rounded-[8px] border border-border bg-background text-13-m text-foreground",
                              isSelected &&
                                "border-primary bg-primary/10 text-primary",
                            )}
                          >
                            {schedule.startTime} - {schedule.endTime}
                          </button>
                        );
                      })
                    ) : (
                      <p className="rounded-[8px] bg-background py-[14px] text-center text-13-m text-muted-foreground">
                        예약 가능한 시간이 없습니다.
                      </p>
                    )}
                  </div>
                </section>
              )}

              <button
                type="button"
                onClick={() => setStep("guest")}
                disabled={!selectedDate || !selectedSchedule}
                className="mt-[16px] h-[44px] w-full rounded-[12px] bg-primary text-14-b text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
              >
                확인
              </button>
            </div>
          )}

          {step === "guest" && (
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setStep("select")}
                className="mb-[12px] flex items-center gap-[4px] text-14-m text-foreground"
              >
                <span>←</span>
                <span>뒤로</span>
              </button>

              <section>
                <p className="mb-[10px] text-14-b text-foreground">
                  참여 인원 수
                </p>

                <div className="flex h-[40px] items-center justify-between rounded-[999px] border border-border px-[12px]">
                  <button
                    type="button"
                    onClick={decreaseGuest}
                    disabled={guestCount <= 1}
                    className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-16-m disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="text-14-m text-foreground">
                    {guestCount}
                  </span>

                  <button
                    type="button"
                    onClick={increaseGuest}
                    disabled={guestCount >= 50}
                    className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-16-m disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </section>

              <button
                type="button"
                onClick={() => setStep("summary")}
                className="mt-[16px] h-[44px] w-full rounded-[12px] bg-primary text-14-b text-primary-foreground"
              >
                확인
              </button>
            </div>
          )}

          {step === "summary" && (
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setStep("guest")}
                className="mb-[12px] flex items-center gap-[4px] text-14-m text-foreground"
              >
                <span>←</span>
                <span>뒤로</span>
              </button>

              <section className="rounded-[16px] bg-background px-[14px] py-[14px]">
                <div className="space-y-[10px]">
                  <div className="flex justify-between">
                    <span className="text-13-m text-muted-foreground">
                      날짜
                    </span>
                    <span className="text-14-m text-foreground">
                      {selectedDate
                        ? format(selectedDate, "M월 d일", { locale: ko })
                        : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-13-m text-muted-foreground">
                      시간
                    </span>
                    <span className="text-14-m text-foreground">
                      {selectedSchedule
                        ? `${selectedSchedule.startTime} - ${selectedSchedule.endTime}`
                        : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-13-m text-muted-foreground">
                      인원
                    </span>
                    <span className="text-14-m text-foreground">
                      {guestCount}명
                    </span>
                  </div>

                  <div className="border-t border-border pt-[10px]" />

                  <div className="flex justify-between">
                    <span className="text-13-m text-muted-foreground">
                      총 합계
                    </span>
                    <span className="text-16-b text-foreground">
                      ₩ {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canReserve || isPending}
                  className="mt-[16px] h-[44px] w-full rounded-[12px] bg-primary text-14-b text-primary-foreground disabled:opacity-50"
                >
                  {mode === "edit" ? "예약 변경" : "예약하기"}
                </button>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
