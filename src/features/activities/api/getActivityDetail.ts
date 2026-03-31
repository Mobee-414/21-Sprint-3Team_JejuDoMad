import {
  ActivityDetailSchema,
  ActivityDetail,
} from "../schemas/activity.schema";

export const getActivityDetail = async (
  activityId: number,
): Promise<ActivityDetail> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) throw new Error("활동 상세 정보를 불러오는데 실패했습니다.");

  const data = await res.json();
  return ActivityDetailSchema.parse(data);
};
