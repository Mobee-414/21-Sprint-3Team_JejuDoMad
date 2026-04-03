"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReservationFormMobile from "./ReservationFormMobile";
import ReservationFormTablet from "./ReservationFormTablet";
import ReservationFormDesktop from "./ReservationFormDesktop";
import ReservationFormBar from "./ReservationFormBar";
import ReservationSuccessDialog from "./ReservationSuccessDialog";
import { useCreateReservation } from "@/features/activities/hooks/useCreateReservation";
import type { CreateReservationParams } from "@/features/activities/api/createReservation";
import { Dialog, DialogContent } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button";

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
  user: {
    id: number;
    nickname: string;
  } | null;
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
  user,
}: ReservationFormResponsiveProps) {
  const [isReservationOpen, setIsReservationOpen] = useState(mode === "edit");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const isReschedule = mode === "edit";
  const router = useRouter();

  const { mutateAsync: createReservation, isPending } =
    useCreateReservation(activityId);

  const handleOpenReservation = () => {
    if (!user) {
      openLoginDialog();
      return;
    }
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
    onClose?.();
  };

  const openLoginDialog = () => {
    setIsLoginDialogOpen(true);
  };

  const handleSubmitReservation = async (params: CreateReservationParams) => {
    console.log("submit user", user);
    if (!user) {
      openLoginDialog();
      return;
    }
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
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="w-[320px] rounded-[24px] bg-card px-[30px] pt-[34px] pb-[30px] md:w-[400px] md:rounded-[30px] md:px-[40px] md:pt-[40px] md:pb-[30px]">
          <div className="flex flex-col items-center gap-[16px] md:gap-[20px]">
            <p className="text-16-b text-foreground md:text-18-b">
              로그인 후 예약할 수 있어요.
            </p>

            <Button
              type="button"
              onClick={() => {
                setIsLoginDialogOpen(false);
                router.push("/login");
              }}
              className="flex h-[41px] w-[180px] items-center justify-center rounded-[12px] text-14-b text-primary-foreground md:h-[47px] md:w-[200px] md:rounded-[14px] md:text-16-b"
            >
              로그인하러 가기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
