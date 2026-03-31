import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(), // 삭제된 시간 (없을 경우 null)
});

/**
 * 내 알림 목록 응답 스키 - GetMyNotificationsResponse
 */
export const MyNotificationsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  notifications: z.array(NotificationSchema),
  totalCount: z.number(),
});

// 타입 추출
export type Notification = z.infer<typeof NotificationSchema>;
export type MyNotificationsResponse = z.infer<
  typeof MyNotificationsResponseSchema
>;
