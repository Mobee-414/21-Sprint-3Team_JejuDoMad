import { Patch } from "@/shared/api/request";
import {
  ActivitySchema,
  ActivityRequest,
} from "@/features/myActivities/types/schema";

export const updateMyActivity = async (
  activityId: number,
  data: ActivityRequest,
) => {
  return await Patch(`my-activities/${activityId}`, ActivitySchema, data);
};
