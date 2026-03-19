"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MyReservationList from "./MyReservationList";
import { mockReservations } from "../constants/mockReservations";
import { ReservationStatus } from "../types/reservation";

const filterOptions: { label: string; value: ReservationStatus }[] = [
  { label: "예약 완료", value: "pending" },
  { label: "예약 취소", value: "canceled" },
  { label: "예약 승인", value: "confirmed" },
  { label: "예약 거절", value: "declined" },
  { label: "체험 완료", value: "completed" },
];

export default function ReservationListSection() {
    const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | null>(null);

    const filteredReservations =
      selectedStatus === null
      ? mockReservations
      : mockReservations.filter(
        (reservation) => reservation.status === selectedStatus,
      );

  return (
    <section className="flex flex-col w-full max-w-[375px] px-6 gap-[30px] md:max-w-[476px] md:px-0 lg:max-w-[640px]">
      <div className="flex flex-col w-full max-w-[327px] gap-[10px] py-[10px] md:max-w-[476px] md:gap-[14px] lg:max-w-[640px]">
          <h2 className="text-18-b text-gray-950">예약내역</h2>
          <p className="text-14-m text-gray-500">
            예약내역 변경 및 취소할 수 있습니다.
          </p>
  

        <div className="w-full max-w-[327px] md:max-w-[482px]">
        <div className="scrollbar-hide flex h-[39px] items-center gap-2 overflow-x-auto whitespace-nowrap">
          {filterOptions.map((option) => {
            const isSelected = selectedStatus === option.value;

            return (
             <Button
                key={option.value}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedStatus(selectedStatus === option.value ? null : option.value)}
                className={[
                    "h-9.75 shrink-0 rounded-[100px] px-4 py-2.5",
                    "gap-1.5 border",
                    isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 bg-white text-gray-950 hover:border-primary hover:text-primary",
                ].join(" ")}
>
                {option.label}
            </Button>
            );
          })}
        </div>
      </div>
      </div>

      <div>
        <MyReservationList reservations={filteredReservations} />
      </div>
    </section>
  );
}