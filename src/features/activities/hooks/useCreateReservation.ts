"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createReservation,
  CreateReservationParams,
} from "../api/createReservation";

export const useCreateReservation = (activityId: number) => {
  return useMutation({
    mutationFn: (params: CreateReservationParams) =>
      createReservation(activityId, params),
    onSuccess: () => {
      alert("예약이 완료되었습니다.");
    },
    onError: () => {
      alert("예약에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
