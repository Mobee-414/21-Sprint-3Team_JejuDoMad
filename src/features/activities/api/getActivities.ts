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
  const query = new URLSearchParams();
  query.set("method", params?.method ?? "offset");
  query.set("page", String(params?.page ?? 1));
  query.set("size", String(params?.size ?? 10));
  if (params?.category) query.set("category", params.category);
  if (params?.keyword) query.set("keyword", params.keyword);
  if (params?.sort) query.set("sort", params.sort);
  if (params?.cursorId) query.set("cursorId", String(params.cursorId));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/activities?${query}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) throw new Error("활동 목록을 불러오는데 실패했습니다.");

  const data = await res.json();
  return ActivitiesListResponseSchema.parse(data);
};
