import { Patch } from "@/shared/api/request";
import {
  PostActivityResponseSchema,
  type ActivityRequest,
  type ActivityDetail,
} from "@/features/activities/schemas/activity.schema";

export const updateMyActivity = async (
  activityId: number,
  data: ActivityRequest,
): Promise<ActivityDetail> => {
  return (await Patch(
    `my-activities/${activityId}`,
    PostActivityResponseSchema,
    data,
  )) as ActivityDetail;
};
