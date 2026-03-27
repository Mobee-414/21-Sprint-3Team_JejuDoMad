import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { updateMyActivity } from "../api/updateMyActivity";
import {
  Activity,
  ActivityRequest,
} from "@/features/myActivities/types/schema";

export const useUpdateMyActivity = (activityId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Activity, Error, ActivityRequest>({
    mutationFn: (data: ActivityRequest) => updateMyActivity(activityId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivities.lists(),
      });

      // 임시 주석 처리
      // 상세페이지 작업 후 연결 예정
      /*
      queryClient.invalidateQueries({
        queryKey: queryKeys.activities.detail(activityId),
      });
      */

      alert("체험 정보가 성공적으로 수정되었습니다.");
    },

    onError: (error: Error) => {
      console.error("수정 실패:", error.message);
      alert(
        error.message || "수정 중 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    },
  });
};
