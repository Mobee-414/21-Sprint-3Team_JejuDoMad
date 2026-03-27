import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMyReservation } from "../api/myReservations.api";

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMyReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myReservations"],
      });
    },
  });
}
