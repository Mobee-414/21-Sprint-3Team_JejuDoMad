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
} as const;
