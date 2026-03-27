"use client";

import { useQuery } from "@tanstack/react-query";
import { getActivities, GetActivitiesParams } from "../api/getActivities";
import { ActivitiesListResponse } from "../schemas/activity.schema";
import { queryKeys } from "@/shared/api/queryKeys";

export const useActivities = (params?: GetActivitiesParams) => {
  return useQuery<ActivitiesListResponse>({
    queryKey: queryKeys.activities.list(params),
    queryFn: () => getActivities(params),
  });
};
