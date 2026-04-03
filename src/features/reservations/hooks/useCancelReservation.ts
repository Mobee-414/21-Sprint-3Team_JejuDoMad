import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMyReservation } from "../api/myReservations.api";
import { toast } from "sonner";
import { queryKeys } from "@/shared/api/queryKeys";

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMyReservation,
    onSuccess: () => {
      toast.success("예약이 취소되었습니다.");
      queryClient.invalidateQueries({
        queryKey: queryKeys.myReservations.all,
      });
    },
    onError: () => {
      toast.error("예약 취소에 실패했습니다.");
    },
  });
}
