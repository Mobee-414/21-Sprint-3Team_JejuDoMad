import { z } from "zod";

export const reservationStatusSchema = z.enum([
  "pending",
  "confirmed",
  "declined",
  "canceled",
  "completed",
]);

export const reservationActivitySchema = z.object({
  id: z.number(),
  title: z.string(),
  bannerImageUrl: z.string(),
});

export const myReservationItemSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activity: reservationActivitySchema,
  scheduleId: z.number(),
  status: reservationStatusSchema,
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const myReservationsResponseSchema = z.object({
  reservations: z.array(myReservationItemSchema),
  cursorId: z.number().nullable(),
  totalCount: z.number().optional(),
});

export const cancelReservationRequestSchema = z.object({
  status: z.literal("canceled"),
});

export const createReviewRequestSchema = z.object({
  rating: z.number().min(1, "별점을 선택해주세요.").max(5),
  content: z
    .string()
    .trim()
    .min(1, "리뷰 내용을 입력해주세요.")
    .max(100, "리뷰는 100자 이하로 입력해주세요."),
});

export type ReservationStatus = z.infer<typeof reservationStatusSchema>;
export type ReservationActivity = z.infer<typeof reservationActivitySchema>;
export type MyReservationItem = z.infer<typeof myReservationItemSchema>;
export type MyReservationsResponse = z.infer<
  typeof myReservationsResponseSchema
>;
export type CancelReservationRequest = z.infer<
  typeof cancelReservationRequestSchema
>;
export type CreateReviewRequest = z.infer<typeof createReviewRequestSchema>;
