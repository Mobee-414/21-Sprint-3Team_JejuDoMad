import { Patch } from "@/shared/api/request";
import {
  PostActivityResponseSchema,
  type UpdateActivityRequest,
  type ActivityDetail,
} from "@/features/activities/schemas/activity.schema";

export const updateMyActivity = async (
  activityId: number,
  data: UpdateActivityRequest,
): Promise<ActivityDetail> => {
  return (await Patch(
    `my-activities/${activityId}`,
    PostActivityResponseSchema,
    data,
  )) as ActivityDetail;
};
