"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postActivity } from "@/features/activities/api/postActivities";
import { queryKeys } from "@/shared/api/queryKeys";
import { type ActivityRequest } from "@/features/activities/schemas/activity.schema";
import { AxiosError } from "axios";

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ActivityRequest) => postActivity(data),

    onSuccess: (data) => {
      console.log("등록 성공:", data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivities.lists(),
      });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "등록 중 오류가 발생했습니다.";
      console.error("Activity Registration Error:", errorMessage);
    },
  });
};
