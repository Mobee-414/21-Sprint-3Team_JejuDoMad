"use client";

import { useState } from "react";
import ReservationFormMobile from "./ReservationFormMobile";
import ReservationFormTablet from "./ReservationFormTablet";
import ReservationFormDesktop from "./ReservationFormDesktop";
import ReservationFormBar from "./ReservationFormBar";
import { useCreateReservation } from "@/features/activities/hooks/useCreateReservation";

interface ReservationFormResponsiveProps {
  activityId: number;
  price: number;
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  mode?: "create" | "edit";
  reservationId?: number;
  initialScheduleId?: number;
  initialHeadCount?: number;
  onClose?: () => void;
}

export default function ReservationFormResponsive({
  activityId,
  price,
  schedules,
  mode = "create",
  reservationId,
  initialScheduleId,
  initialHeadCount = 1,
  onClose,
}: ReservationFormResponsiveProps) {
  const [isReservationOpen, setIsReservationOpen] = useState(mode === "edit");
  const isReschedule = mode === "edit";

  const { mutate: createReservation, isPending } =
    useCreateReservation(activityId);

  const handleOpenReservation = () => {
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
    onClose?.();
  };

  return (
    <>
      <div className="block min-[744px]:hidden">
        {!isReservationOpen && (
          <ReservationFormBar price={price} onOpen={handleOpenReservation} />
        )}

        <ReservationFormMobile
          open={isReservationOpen}
          onClose={handleCloseReservation}
          price={price}
          schedules={schedules}
          mode={mode}
          reservationId={reservationId}
          initialScheduleId={initialScheduleId}
          initialHeadCount={initialHeadCount}
          onSubmitReservation={createReservation}
          isPending={isPending}
        />
      </div>

      <div className="hidden min-[744px]:block min-[1024px]:hidden">
        {!isReservationOpen && mode !== "edit" && (
          <ReservationFormBar price={price} onOpen={handleOpenReservation} />
        )}
        <ReservationFormTablet
          open={isReservationOpen}
          onClose={handleCloseReservation}
          price={price}
          schedules={schedules}
          mode={mode}
          reservationId={reservationId}
          initialScheduleId={initialScheduleId}
          initialHeadCount={initialHeadCount}
          onSubmitReservation={createReservation}
          isPending={isPending}
        />
      </div>

      <div className="hidden min-[1024px]:block">
        {isReschedule ? (
          <ReservationFormTablet
            open
            onClose={handleCloseReservation}
            price={price}
            schedules={schedules}
            mode={mode}
            reservationId={reservationId}
            initialScheduleId={initialScheduleId}
            initialHeadCount={initialHeadCount}
            onSubmitReservation={createReservation}
            isPending={isPending}
          />
        ) : (
          <ReservationFormDesktop
            price={price}
            schedules={schedules}
            onSubmitReservation={createReservation}
            isPending={isPending}
          />
        )}
      </div>
    </>
  );
}
