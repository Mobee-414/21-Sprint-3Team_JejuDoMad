"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useReservationForm } from "../hooks/useReservationForm";
import type { Schedule } from "../types/reservation.schema";

interface ReservationFormTabletProps {
  open: boolean;
  onClose: () => void;
  price: number;
  schedules: Schedule[];
}

export default function ReservationFormTablet({
  open,
  onClose,
  price,
  schedules,
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
  } = useReservationForm({
    price,
    schedules,
  });

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
        <div className="mx-auto w-[744px] rounded-t-[24px] border-t border-border bg-card px-[30px] pt-[24px] pb-[18px] shadow-[0_-10px_24px_rgba(156,180,202,0.38)]">
          <div className="flex flex-col">
            <div className="mx-auto w-fit">
              <p className="mb-[12px] text-16-b text-foreground">날짜</p>

              <div className="flex items-stretch gap-[40px]">
                <div className="w-[359px] shrink-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    className="w-full rounded-[6px] p-0"
                    size="sm"
                  />
                </div>

                <section className="flex w-[260px] flex-col rounded-[24px] bg-background px-[16px] py-[16px]">
                  <p className="text-16-b text-foreground">예약 가능한 시간</p>

                  <div className="mt-[10px] flex-1 overflow-y-auto">
                    {availableSchedules.length > 0 ? (
                      <div className="flex flex-col gap-[8px]">
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
                                "h-[36px] w-full rounded-[8px] border border-border px-[12px] text-13-m text-foreground",
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
                      <p className="pt-[8px] text-center text-13-m text-muted-foreground">
                        날짜를 선택해주세요.
                      </p>
                    )}
                  </div>

                  <div className="mt-[16px]">
                    <p className="mb-[8px] text-14-b text-foreground">
                      참여 인원 수
                    </p>

                    <div className="flex h-[36px] items-center justify-between rounded-[24px] border border-border px-[10px]">
                      <button
                        type="button"
                        onClick={decreaseGuest}
                        disabled={guestCount <= 1}
                        className="h-[28px] w-[28px] rounded-[6px] text-16-m disabled:opacity-40"
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
                        className="h-[28px] w-[28px] rounded-[6px] text-16-m disabled:opacity-40"
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
              disabled={!canReserve}
              className="mt-[24px] h-[44px] w-full rounded-[12px] bg-primary text-14-b text-primary-foreground disabled:opacity-50"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
