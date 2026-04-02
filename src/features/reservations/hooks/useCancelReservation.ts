import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMyReservation } from "../api/myReservations.api";
import { toast } from "sonner";

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMyReservation,
    onSuccess: () => {
      toast.success("예약이 취소되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["myReservations"],
      });
    },
    onError: () => {
      toast.error("예약 취소에 실패했습니다.");
    },
  });
}
