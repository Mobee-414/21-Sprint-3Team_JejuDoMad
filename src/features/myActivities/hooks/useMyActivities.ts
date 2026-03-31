import { useQuery } from "@tanstack/react-query";
import { getMyActivities } from "@/features/myActivities/api/getMyActivities";
import { type ActivitiesListResponse } from "@/features/activities/schemas/activity.schema";
import { queryKeys } from "@/shared/api/queryKeys";

export function useMyActivities() {
  const params = { size: 20 };

  const { data, isLoading, error, refetch } = useQuery<ActivitiesListResponse>({
    queryKey: queryKeys.myActivities.list(params),
    queryFn: () => getMyActivities(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    activities: data?.activities ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error,
    refetch,
  };
}
