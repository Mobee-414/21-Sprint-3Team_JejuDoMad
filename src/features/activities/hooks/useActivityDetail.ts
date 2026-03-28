"use client";

import { useQuery } from "@tanstack/react-query";
import { getActivityDetail } from "../api/getActivityDetail";
import { ActivityDetail } from "../schemas/activity.schema";

export const useActivityDetail = (activityId: number) => {
  return useQuery<ActivityDetail>({
    queryKey: ["activities", activityId],
    queryFn: () => getActivityDetail(activityId),
    enabled: !!activityId,
  });
};
