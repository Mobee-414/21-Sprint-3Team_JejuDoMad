"use client";

import { useState } from "react";
import ReservationFormMobile from "./ReservationFormMobile";
import ReservationFormTablet from "./ReservationFormTablet";
import ReservationFormDesktop from "./ReservationFormDesktop";
import ReservationFormBar from "./ReservationFormBar";
import ReservationSuccessDialog from "./ReservationSuccessDialog";
import { useCreateReservation } from "@/features/activities/hooks/useCreateReservation";
import type { CreateReservationParams } from "@/features/activities/api/createReservation";

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
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const isReschedule = mode === "edit";

  const { mutateAsync: createReservation, isPending } =
    useCreateReservation(activityId);

  const handleOpenReservation = () => {
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
    onClose?.();
  };

  const handleSubmitReservation = async (params: CreateReservationParams) => {
    try {
      await createReservation(params);
      handleCloseReservation();
      setIsSuccessDialogOpen(true);
    } catch (error) {
      console.error(error);
    }
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
          onSubmitReservation={handleSubmitReservation}
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
          onSubmitReservation={handleSubmitReservation}
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
            onSubmitReservation={handleSubmitReservation}
            isPending={isPending}
          />
        ) : (
          <ReservationFormDesktop
            price={price}
            schedules={schedules}
            onSubmitReservation={handleSubmitReservation}
            isPending={isPending}
          />
        )}
      </div>
      <ReservationSuccessDialog
        open={isSuccessDialogOpen}
        onOpenChange={setIsSuccessDialogOpen}
      />
    </>
  );
}
