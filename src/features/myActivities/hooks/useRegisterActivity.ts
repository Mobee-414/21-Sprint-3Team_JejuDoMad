import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { postRegisterActivity } from "../api/postRegisterActivity";
import { queryKeys } from "@/shared/api/queryKeys";
import { type ActivityRequest } from "../types/schema";
import { AxiosError } from "axios";

export const useRegisterActivity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ActivityRequest) => postRegisterActivity(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivities.lists(),
      });
      // 추후 토스트 변경
      alert("체험이 성공적으로 등록되었습니다!");
      router.push("/mypage/activities");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      // 토스트 변경
      const errorMessage =
        error.response?.data?.message || "등록 중 오류가 발생했습니다.";
      alert(errorMessage);
      console.error("Activity Registration Error:", error);
    },
  });
};
