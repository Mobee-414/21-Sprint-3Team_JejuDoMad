import { useMutation } from "@tanstack/react-query";
import { updateReservation } from "../api/myReservations.api";

interface UpdateApplicationParams {
  reservationId: number;
  scheduleId: number;
  headCount: number;
}

export default function useUpdateApplication() {
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
  });
}
