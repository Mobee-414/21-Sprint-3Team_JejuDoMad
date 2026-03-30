import { Post } from "@/shared/api/request";
import {
  CreateActivityResponse,
  CreateActivityResponseSchema,
  CreateActivityRequest,
} from "../schemas/activity.schema";

export const postActivity = async (
  body: CreateActivityRequest,
): Promise<CreateActivityResponse> => {
  return Post("activities", CreateActivityResponseSchema, body);
};
