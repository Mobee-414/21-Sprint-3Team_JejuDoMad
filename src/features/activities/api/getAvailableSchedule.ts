import { Get } from "@/shared/api/request";
import {
  AvailableSchedulesResponseSchema,
  AvailableSchedulesResponse,
} from "../schemas/activity.schema";

export type GetAvailableScheduleParams = {
  year: string;
  month: string;
};

export const getAvailableSchedule = async (
  activityId: number,
  params: GetAvailableScheduleParams,
): Promise<AvailableSchedulesResponse> => {
  return Get(
    `activities/${activityId}/available-schedule`,
    AvailableSchedulesResponseSchema,
    { params },
  );
};
