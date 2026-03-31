import {
  AvailableSchedulesResponseSchema,
  AvailableSchedulesResponse,
} from "../schemas/activity.schema";

export type GetAvailableScheduleParams = {
  year: string;
  month: string;
};

export const getAvailableSchedule = async (
  activityId: number,
  params: GetAvailableScheduleParams,
): Promise<AvailableSchedulesResponse> => {
  const query = new URLSearchParams(params);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}/available-schedule?${query}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("예약 가능 일정을 불러오는데 실패했습니다.");

  const data = await res.json();
  return AvailableSchedulesResponseSchema.parse(data);
};
