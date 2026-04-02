"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReservation } from "@/features/activities/api/createReservation";
import type { CreateReservationParams } from "@/features/activities/api/createReservation";

export const useCreateReservation = (activityId: number) => {
  return useMutation({
    mutationFn: (params: CreateReservationParams) =>
      createReservation(activityId, params),

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message) {
          toast("예약 실패", {
            description: message,
          });
          return;
        }
      }
      toast("예약 실패", {
        description: "예약 중 오류가 발생했습니다.",
      });
    },
  });
};
