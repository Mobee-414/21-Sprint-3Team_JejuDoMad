import { Get } from "@/shared/api/request";
import {
  ReviewsResponseSchema,
  ReviewsResponse,
} from "../schemas/activity.schema";

export type GetReviewsParams = {
  page?: number;
  size?: number;
};

export const getActivityReviews = async (
  activityId: number,
  params?: GetReviewsParams,
): Promise<ReviewsResponse> => {
  return Get(`activities/${activityId}/reviews`, ReviewsResponseSchema, {
    params: {
      page: 1,
      size: 3,
      ...params,
    },
  });
};
