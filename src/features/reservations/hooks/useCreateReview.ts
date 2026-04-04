import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../api/myReservations.api";
import { queryKeys } from "@/shared/api/queryKeys";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myReservations.all,
      });
    },
  });
};
