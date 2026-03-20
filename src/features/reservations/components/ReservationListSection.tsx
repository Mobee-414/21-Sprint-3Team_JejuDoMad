"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MyReservationList from "./MyReservationList";
import { mockReservations } from "../constants/mockReservations";
import { ReservationStatus } from "../types/reservation";
import ReservationEmptyState from "./ReservationEmptyState";

const filterOptions: { label: string; value: ReservationStatus }[] = [
  { label: "예약 완료", value: "pending" },
  { label: "예약 취소", value: "canceled" },
  { label: "예약 승인", value: "confirmed" },
  { label: "예약 거절", value: "declined" },
  { label: "체험 완료", value: "completed" },
];

export default function ReservationListSection() {
  const [selectedStatus, setSelectedStatus] =
    useState<ReservationStatus | null>(null);

  const filteredReservations =
    selectedStatus === null
      ? mockReservations
      : mockReservations.filter(
          (reservation) => reservation.status === selectedStatus,
        );

  const isEmpty = filteredReservations.length === 0;

  return (
    <section className="flex w-full flex-col gap-7.5 md:max-w-119 lg:max-w-160">
      <div className="flex w-full flex-col gap-2.5 py-2.5 md:gap-3.5">
        <h2 className="text-18-b text-gray-950">예약내역</h2>
        <p className="text-14-m text-gray-500">
          예약내역 변경 및 취소할 수 있습니다.
        </p>

        {!isEmpty && (
          <div className="w-full">
            <div className="scrollbar-hide flex h-9.75 items-center gap-2 overflow-x-auto whitespace-nowrap">
              {filterOptions.map((option) => {
                const isSelected = selectedStatus === option.value;

                return (
                  <Button
                    key={option.value}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedStatus(
                        selectedStatus === option.value ? null : option.value,
                      )
                    }
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
        )}
      </div>

      <div>
        {filteredReservations.length === 0 ? (
          <div className="flex w-full justify-center">
            <ReservationEmptyState />
          </div>
        ) : (
          <MyReservationList reservations={filteredReservations} />
        )}
      </div>
    </section>
  );
}
