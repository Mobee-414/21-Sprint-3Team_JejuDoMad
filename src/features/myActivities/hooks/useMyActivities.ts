import { useQuery } from "@tanstack/react-query";
import { getMyActivities } from "@/features/myActivities/api/getMyActivities";
import { GetMyActivitiesResponse } from "@/features/myActivities/types/activity.types";

export function useMyActivities() {
  const { data, isLoading, error, refetch } = useQuery<GetMyActivitiesResponse>(
    {
      queryKey: ["myActivities"],
      queryFn: getMyActivities,
      staleTime: 1000 * 60 * 5,
    },
  );

  return {
    activities: data?.activities ?? [],
    isLoading,
    error,
    refetch,
  };
}
