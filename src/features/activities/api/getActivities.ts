import { Get } from "@/shared/api/request";
import {
  ActivitiesListResponseSchema,
  ActivitiesListResponse,
} from "../schemas/activity.schema";

export type GetActivitiesParams = {
  method?: "offset" | "cursor";
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
  sort?: string;
  cursorId?: number;
};

export const getActivities = async (
  params?: GetActivitiesParams,
): Promise<ActivitiesListResponse> => {
  return Get("activities", ActivitiesListResponseSchema, {
    params: {
      method: "offset",
      page: 1,
      size: 10,
      ...params,
    },
  });
};
