import { Post } from "@/shared/api/request";
import {
  ActivitySchema,
  type Activity,
  type ActivityRequest,
} from "@/features/myActivities/types/schema";

export const postRegisterActivity = async (
  data: ActivityRequest,
): Promise<Activity> => {
  return await Post("/activities", ActivitySchema, data);
};
