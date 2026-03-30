import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { deleteMyActivity } from "../api/deleteMyActivity";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (activityId: number) => deleteMyActivity(activityId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivities.lists(),
      });
    },

    onError: (error) => {
      console.error("삭제 실패:", error.message);
      alert(error.message || "체험 삭제 중 오류가 발생했습니다.");
    },
  });
};
