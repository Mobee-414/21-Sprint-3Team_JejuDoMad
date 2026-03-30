import { useQuery } from "@tanstack/react-query";
import { fetchReservationList } from "@/features/myStatus/types/schema";
import { queryKeys } from "@/shared/api/queryKeys";

export const useGetReservationList = (
  activityId: number | undefined,
  size: number = 10,
  status?: string,
) => {
  return useQuery({
    queryKey: [...queryKeys.reservation.all, "list", activityId, status],
    queryFn: () => fetchReservationList(activityId!, { size, status }),
    enabled: !!activityId,
  });
};
