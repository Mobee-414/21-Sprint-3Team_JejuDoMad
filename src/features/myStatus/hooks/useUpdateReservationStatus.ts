import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReservationStatus } from "@/features/myStatus/api/updateReservationStatus";
import { queryKeys } from "@/shared/api/queryKeys";

export const useUpdateReservationStatus = (activityId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn에서 인자를 객체 형태로 넘겨줍니다.
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: "confirmed" | "declined";
    }) => updateReservationStatus({ activityId, reservationId, status }),

    onSuccess: () => {
      // 데이터를 먼저 무효화해서 백그라운드에서 새로고침을 시작합니다.
      queryClient.invalidateQueries({ queryKey: queryKeys.reservation.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.myActivities.all });
      // 대시보드 숫자 업데이트를 위해 추가 권장
      queryClient.invalidateQueries({ queryKey: ["reservation-dashboard"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
