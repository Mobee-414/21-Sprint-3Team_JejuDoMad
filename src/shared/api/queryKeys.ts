/**
 React Query 키를 관리하는 Factory
 */

export const queryKeys = {
  // 내 체험 myActivities
  myActivities: {
    all: ["myActivities"] as const,
    lists: () => [...queryKeys.myActivities.all, "list"] as const,
    list: (params: object) =>
      [...queryKeys.myActivities.lists(), params] as const,
  },

  // Activities
  activities: {
    all: ["activities"] as const,
    lists: () => [...queryKeys.activities.all, "list"] as const,
    list: (params?: object) =>
      [...queryKeys.activities.lists(), params] as const,
    reviews: (activityId: number, params?: object) =>
      [...queryKeys.activities.all, activityId, "reviews", params] as const,
    availableSchedule: (activityId: number, params?: object) =>
      [
        ...queryKeys.activities.all,
        activityId,
        "available-schedule",
        params,
      ] as const,
  },

  // 예약관련
  reservation: {
    all: ["reservations"] as const,
    dashboard: (activityId: number, year: string, month: string) =>
      [
        ...queryKeys.reservation.all,
        "dashboard",
        activityId,
        { year, month },
      ] as const,
    schedules: (activityId: number, date: string) =>
      [
        ...queryKeys.reservation.all,
        "schedules",
        activityId,
        { date },
      ] as const,
    list: (activityId: number, params: object) =>
      [...queryKeys.reservation.all, "list", activityId, params] as const,
  },

  // 알림 myNotifications
  myNotifications: {
    all: ["myNotifications"] as const,
    lists: () => [...queryKeys.myNotifications.all, "list"] as const,
    list: (params: object) =>
      [...queryKeys.myNotifications.lists(), params] as const,
  },
} as const;
