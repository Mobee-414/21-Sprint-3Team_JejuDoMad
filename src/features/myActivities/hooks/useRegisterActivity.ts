import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRegisterActivity } from "../api/postRegisterActivity";
import { queryKeys } from "@/shared/api/queryKeys";
import { type ActivityRequest } from "../types/schema";
import { AxiosError } from "axios";

export const useRegisterActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ActivityRequest) => postRegisterActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivities.lists(),
      });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Activity Registration Error:", error);
    },
  });
};
