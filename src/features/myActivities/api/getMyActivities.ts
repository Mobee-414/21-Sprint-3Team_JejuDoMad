import { Get } from "@/shared/api/request";
import {
  ActivitiesListResponseSchema,
  type ActivitiesListResponse,
} from "@/features/activities/schemas/activity.schema";

export const getMyActivities = async (): Promise<ActivitiesListResponse> => {
  return await Get("my-activities", ActivitiesListResponseSchema);
};
