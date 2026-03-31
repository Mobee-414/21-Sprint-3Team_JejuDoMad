import { Post } from "@/shared/api/request";
import { z } from "zod";
import {
  type ActivityDetail,
  type ActivityRequest,
} from "@/features/activities/schemas/activity.schema";

export const postActivity = async (
  data: ActivityRequest,
): Promise<ActivityDetail> => {
  return (await Post("activities", z.looseObject({}), data)) as ActivityDetail;
};
