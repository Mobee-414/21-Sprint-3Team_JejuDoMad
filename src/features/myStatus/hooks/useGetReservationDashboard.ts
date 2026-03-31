import { useQuery } from "@tanstack/react-query";
import { fetchReservationDashboard } from "@/features/myStatus/types/schema";
import { queryKeys } from "@/shared/api/queryKeys";

export const useGetReservationDashboard = (
  activityId: number | undefined,
  year: string,
  month: string,
) => {
  return useQuery({
    // activityId, 연도, 월이 바뀔 때마다 새로운 데이터를 가져오도록 키를 설정합니다.
    queryKey: [
      ...queryKeys.reservation.all,
      "dashboard",
      activityId,
      year,
      month,
    ],
    queryFn: () => fetchReservationDashboard(activityId!, year, month),
    enabled: !!activityId, // 체험 ID가 선택되었을 때만 실행
  });
};
