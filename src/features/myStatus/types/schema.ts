import { Get, Patch } from "@/shared/api/request";
import { z } from "zod";

// ---------------------------------------------------------------------------
// 내체험목록조회 fetchMyActivityList - 드롭다운에 뿌려줄 체험id와 제목가져오기
// ---------------------------------------------------------------------------

export const ReservationDashboardSchema = z.object({
  date: z.string(),
  reservations: z.object({
    completed: z.number(),
    confirmed: z.number(),
    pending: z.number(),
  }),
});

export const ReservedScheduleSchema = z.object({
  scheduleId: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  count: z.object({
    declined: z.number(),
    confirmed: z.number(),
    pending: z.number(),
  }),
});

export const ReservationDetailSchema = z.object({
  id: z.number(),
  nickname: z.string().optional(),
  userId: z.number(),
  teamId: z.string(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: z.enum(["pending", "confirmed", "declined", "completed"]),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReservationListResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  reservations: z.array(ReservationDetailSchema),
});

export const MyActivitySchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const MyActivitiesResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  activities: z.array(MyActivitySchema),
});

// ---------------------------------------------------------
// 2. API Functions (팀 내 Get, Patch 헬퍼 사용)
// ---------------------------------------------------------

/** 내 체험 목록 조회 */
export const fetchMyActivityList = async () => {
  return await Get("/my-activities", MyActivitiesResponseSchema);
};

/** 월별 예약 현황 대시보드 조회 */
export const fetchReservationDashboard = async (
  activityId: number,
  year: string,
  month: string,
) => {
  return await Get(
    `/my-activities/${activityId}/reservation-dashboard`,
    z.array(ReservationDashboardSchema),
    { params: { year, month } },
  );
};

/** 특정 날짜의 스케줄 조회 */
export const fetchReservedSchedule = async (
  activityId: number,
  date: string,
) => {
  return await Get(
    `/my-activities/${activityId}/reserved-schedule`,
    z.array(ReservedScheduleSchema),
    { params: { date } },
  );
};

/** 상세 예약 내역 조회 */
export const fetchReservationList = async (
  activityId: number,
  params: {
    cursorId?: number | null;
    size: number;
    status?: string;
    scheduleId?: number | null;
  },
) => {
  return await Get(
    `/my-activities/${activityId}/reservations`,
    ReservationListResponseSchema,
    { params },
  );
};

/** 예약 상태 수정 (승인/거절) */
export const updateReservationStatus = async (
  activityId: number,
  reservationId: number,
  status: "confirmed" | "declined",
) => {
  return await Patch(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    ReservationDetailSchema,
    { status },
  );
};

// ---------------------------------------------------------
// 3. Types & Query Keys 확장
// ---------------------------------------------------------

export type ReservationDashboard = z.infer<typeof ReservationDashboardSchema>;
export type ReservedSchedule = z.infer<typeof ReservedScheduleSchema>;
export type ReservationDetail = z.infer<typeof ReservationDetailSchema>;
export type ReservationListResponse = z.infer<
  typeof ReservationListResponseSchema
>;
export type MyActivitiesResponse = z.infer<typeof MyActivitiesResponseSchema>;
export type MyActivity = z.infer<typeof MyActivitySchema>;
export type ReservationStatus = ReservationDetail["status"];
