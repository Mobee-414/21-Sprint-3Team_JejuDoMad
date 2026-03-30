import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { updateMyActivity } from "../api/updateMyActivity";
import {
  type ActivityDetail,
  type ActivityRequest,
} from "@/features/activities/schemas/activity.schema";
import { AxiosError } from "axios";

export const useUpdateMyActivity = (activityId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    ActivityDetail,
    AxiosError<{ message: string }>,
    ActivityRequest
  >({
    mutationFn: (data: ActivityRequest) => updateMyActivity(activityId, data),

    onSuccess: (data) => {
      console.log("수정 성공:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivities.lists(),
      });
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "수정 중 오류가 발생했습니다.";
      console.error("Activity Update Error:", errorMessage);
    },
  });
};
