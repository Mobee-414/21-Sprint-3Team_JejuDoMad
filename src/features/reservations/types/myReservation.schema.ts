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

export const cancelReservationResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
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

export const createReviewRequestSchema = z.object({
  rating: z.number().min(1, "별점을 선택해주세요.").max(5),
  content: z
    .string()
    .trim()
    .min(1, "리뷰 내용을 입력해주세요.")
    .max(100, "리뷰는 100자 이하로 입력해주세요."),
});

export const createReviewResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const reservationFormSchema = z.object({
  price: z.number(),
  schedules: z.array(scheduleSchema),
});

export const updateApplicationRequestSchema = z.object({
  status: reservationStatusSchema,
  headCount: z.number().optional(),
  scheduleId: z.number().optional(),
});

export const updateApplicationResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: z.enum(["pending", "confirmed", "declined", "canceled", "completed"]),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
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
export type CancelReservationResponse = z.infer<
  typeof cancelReservationResponseSchema
>;
export type CreateReviewRequest = z.infer<typeof createReviewRequestSchema>;
export type CreateReviewResponse = z.infer<typeof createReviewResponseSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type ReservationFormData = z.infer<typeof reservationFormSchema>;

export type UpdateApplicationRequest = z.infer<
  typeof updateApplicationRequestSchema
>;
export type UpdateApplicationResponse = z.infer<
  typeof updateApplicationResponseSchema
>;
