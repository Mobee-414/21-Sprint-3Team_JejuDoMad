import { useQuery } from "@tanstack/react-query";
import { getMyActivities } from "@/features/myActivities/api/getMyActivities";
import { type MyActivitiesResponse } from "@/features/myActivities/types/schema";

export function useMyActivities() {
  const { data, isLoading, error, refetch } = useQuery<MyActivitiesResponse>({
    queryKey: ["myActivities"],
    queryFn: getMyActivities,
    staleTime: 1000 * 60 * 5,
  });

  return {
    activities: data?.activities ?? [],
    isLoading,
    error,
    refetch,
  };
}
