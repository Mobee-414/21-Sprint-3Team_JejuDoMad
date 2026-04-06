"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getActivityReviews,
  GetReviewsParams,
} from "../api/getActivitiesReviews";
import { ReviewsResponse } from "../schemas/activity.schema";

export const useActivityReviews = (
  activityId: number,
  params?: GetReviewsParams,
) => {
  return useQuery<ReviewsResponse>({
    queryKey: ["activities", activityId, "reviews", params?.page, params?.size],
    queryFn: () => getActivityReviews(activityId, params),
    enabled: !!activityId,
  });
};
