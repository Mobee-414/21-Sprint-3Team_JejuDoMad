"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MyReservationList from "./MyReservationList";
import {
  ReservationStatus,
  MyReservationItem,
} from "../types/reservation.schema";
import EmptyState from "./EmptyState";
import ReviewDialog from "./ReviewDialog";
import { reservationStatusMap } from "../constants/reservationStatus";
import { useCreateReview } from "@/features/reservations/hooks/useCreateReview";
import { toast } from "sonner";

const filterOptions = Object.entries(reservationStatusMap).map(
  ([value, { label }]) => ({
    value: value as ReservationStatus,
    label,
  }),
);

export default function ReservationListSection() {
  const [selectedStatus, setSelectedStatus] =
    useState<ReservationStatus | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<MyReservationItem | null>(null);

  const { mutate: createReview, isPending } = useCreateReview();

  const handleClickReview = (reservation: MyReservationItem) => {
    setSelectedReservation(reservation);
    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = ({
    rating,
    content,
  }: {
    rating: number;
    content: string;
  }) => {
    if (!selectedReservation) return;

    createReview(
      {
        reservationId: selectedReservation.id,
        rating,
        content,
      },
      {
        onSuccess: () => {
          toast.success("리뷰 작성 완료!");
          setIsReviewDialogOpen(false);
          setSelectedReservation(null);
        },
        onError: () => {
          toast.error("리뷰 작성에 실패했어요");
        },
      },
    );
  };

  const router = useRouter();

  return (
    <section className="flex w-full flex-col gap-[30px] md:max-w-[476px] lg:max-w-[640px]">
      <div className="flex w-full flex-col gap-[10px] py-[10px] md:gap-[14px]">
        <h2 className="text-18-b text-gray-950">예약내역</h2>
        <p className="text-14-m text-gray-500">
          예약내역 변경 및 취소할 수 있습니다.
        </p>

        {
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
        }
      </div>

      <div>
        <MyReservationList
          selectedStatus={selectedStatus}
          onClickReview={handleClickReview}
          empty={
            <div className="flex w-full justify-center">
              <EmptyState
                message="아직 예약한 체험이 없어요"
                buttonText="둘러보기"
                onButtonClick={() => router.push("/activities")}
              />
            </div>
          }
        />
      </div>
      {selectedReservation && (
        <ReviewDialog
          open={isReviewDialogOpen}
          onOpenChange={(open) => {
            setIsReviewDialogOpen(open);

            if (!open) {
              setSelectedReservation(null);
            }
          }}
          activityTitle={selectedReservation.activity.title}
          reviewDate={selectedReservation.date}
          reviewTime={`${selectedReservation.startTime} - ${selectedReservation.endTime}`}
          participantCount={selectedReservation.headCount}
          onSubmit={handleSubmitReview}
          isPending={isPending}
        />
      )}
    </section>
  );
}
