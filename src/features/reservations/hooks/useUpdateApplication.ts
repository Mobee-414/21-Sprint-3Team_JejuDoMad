import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReservation } from "../api/myReservations.api";

interface UpdateApplicationParams {
  reservationId: number;
  scheduleId: number;
  headCount: number;
}

export default function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      scheduleId,
      headCount,
    }: UpdateApplicationParams) =>
      updateReservation(reservationId, {
        scheduleId,
        headCount,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myReservations"],
      });
    },
  });
}
