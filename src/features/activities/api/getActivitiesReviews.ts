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
  const query = new URLSearchParams();
  query.set("page", String(params?.page ?? 1));
  query.set("size", String(params?.size ?? 3));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}/reviews?${query}`,
    { next: { revalidate: 30 } },
  );

  if (!res.ok) throw new Error("리뷰를 불러오는데 실패했습니다.");

  const data = await res.json();
  return ReviewsResponseSchema.parse(data);
};
