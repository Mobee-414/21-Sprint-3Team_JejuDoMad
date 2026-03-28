"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAvailableSchedule,
  GetAvailableScheduleParams,
} from "../api/getAvailableSchedule";
import { AvailableSchedulesResponse } from "../schemas/activity.schema";

export const useAvailableSchedule = (
  activityId: number,
  params: GetAvailableScheduleParams,
) => {
  return useQuery<AvailableSchedulesResponse>({
    queryKey: ["activities", activityId, "available-schedule", params],
    queryFn: () => getAvailableSchedule(activityId, params),
    enabled: !!activityId && !!params.year && !!params.month,
  });
};
