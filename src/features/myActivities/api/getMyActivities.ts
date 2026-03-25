import { Get } from "@/shared/api/request";
import {
  MyActivitiesResponseSchema,
  type MyActivitiesResponse,
} from "@/features/myActivities/types/schema";

export const getMyActivities = async (): Promise<MyActivitiesResponse> => {
  return await Get("/my-activities", MyActivitiesResponseSchema);
};
