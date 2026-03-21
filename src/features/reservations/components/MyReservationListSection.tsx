"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MyReservationList from "./MyReservationList";
import { mockReservations } from "../constants/mockReservations";
import { ReservationStatus, MyReservationItem } from "../types/reservation";
import EmptyState from "./EmptyState";
import ReviewModal from "./ReviewModal";

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
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<MyReservationItem | null>(null);

  const handleClickReview = (reservation: MyReservationItem) => {
    setSelectedReservation(reservation);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = ({
    rating,
    content,
  }: {
    rating: number;
    content: string;
  }) => {
    if (!selectedReservation) return;

    console.log("리뷰 작성", {
      reservationId: selectedReservation.id,
      rating,
      content,
    });

    setIsReviewModalOpen(false);
    setSelectedReservation(null);
  };

  const filteredReservations =
    selectedStatus === null
      ? mockReservations
      : mockReservations.filter(
          (reservation) => reservation.status === selectedStatus,
        );

  const isEmpty = filteredReservations.length === 0;

  const router = useRouter();

  return (
    <section className="flex w-full flex-col gap-[30px] md:max-w-[476px] lg:max-w-[640px]">
      <div className="flex w-full flex-col gap-[10px] py-[10px] md:gap-[14px]">
        <h2 className="text-18-b text-gray-950">예약내역</h2>
        <p className="text-14-m text-gray-500">
          예약내역 변경 및 취소할 수 있습니다.
        </p>

        {!isEmpty && (
          <div className="w-full">
            <div className="scrollbar-hide flex h-[39px] items-center gap-[8px] overflow-x-auto whitespace-nowrap">
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
                    className={cn(
                      "h-[39px] shrink-0 rounded-[100px] px-[16px] py-[10px]",
                      "gap-[6px] border",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 bg-white text-gray-950 hover:border-primary hover:text-primary",
                    )}
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
            <EmptyState
              message="아직 예약한 체험이 없어요"
              buttonText="둘러보기"
              onButtonClick={() => router.push("/activities")}
            />
          </div>
        ) : (
          <MyReservationList
            reservations={filteredReservations}
            onClickReview={handleClickReview}
          />
        )}
      </div>
      {selectedReservation && (
        <ReviewModal
          open={isReviewModalOpen}
          onOpenChange={(open) => {
            setIsReviewModalOpen(open);

            if (!open) {
              setSelectedReservation(null);
            }
          }}
          activityTitle={selectedReservation.activity.title}
          reviewDate={selectedReservation.date}
          reviewTime={`${selectedReservation.startTime} - ${selectedReservation.endTime}`}
          participantCount={selectedReservation.headCount}
          onSubmit={handleSubmitReview}
        />
      )}
    </section>
  );
}
