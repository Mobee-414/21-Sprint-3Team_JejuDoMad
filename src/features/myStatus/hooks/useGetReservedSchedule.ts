import { useQuery } from "@tanstack/react-query";
import { fetchReservedSchedule } from "@/features/myStatus/types/schema";
import { queryKeys } from "@/shared/api/queryKeys";

export const useGetReservedSchedule = (
  activityId: number | undefined,
  date: string,
) => {
  return useQuery({
    queryKey: [...queryKeys.reservation.all, "schedule", activityId, date],
    queryFn: () => fetchReservedSchedule(activityId!, date),
    enabled: !!activityId && !!date,
  });
};
