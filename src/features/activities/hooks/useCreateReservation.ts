"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReservation } from "@/features/activities/api/createReservation";
import type { CreateReservationParams } from "@/features/activities/api/createReservation";

export const useCreateReservation = (activityId: number) => {
  return useMutation({
    mutationFn: (params: CreateReservationParams) =>
      createReservation(activityId, params),

    onSuccess: () => {
      toast.success("예약 완료", {
        description: "예약이 완료되었습니다.",
      });
    },

    onError: () => {
      toast.error("예약 실패", {
        description: "다시 시도해주세요.",
      });
    },
  });
};
