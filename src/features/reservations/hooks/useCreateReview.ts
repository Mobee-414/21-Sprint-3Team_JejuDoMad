import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../api/myReservations.api";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myReservations"],
      });
    },
  });
};
