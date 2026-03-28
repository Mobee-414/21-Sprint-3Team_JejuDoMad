import { Get } from "@/shared/api/request";
import {
  ActivityDetailSchema,
  ActivityDetail,
} from "../schemas/activity.schema";

export const getActivityDetail = async (
  activityId: number,
): Promise<ActivityDetail> => {
  return Get(`activities/${activityId}`, ActivityDetailSchema);
};
