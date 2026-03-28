import { z } from "zod";

export const ActivityListItemSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ActivitiesListResponseSchema = z.object({
  cursorId: z.number().nullable().optional(),
  totalCount: z.number(),
  activities: z.array(ActivityListItemSchema),
});

export const ErrorResponseSchema = z.object({
  message: z.string(),
});

export type ActivityListItem = z.infer<typeof ActivityListItemSchema>;
export type ActivitiesListResponse = z.infer<
  typeof ActivitiesListResponseSchema
>;

export const ScheduleSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const CreateActivitySchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  address: z.string(),
  price: z.number(),
  schedules: z.array(ScheduleSchema),
  bannerImageUrl: z.string(),
  subImageUrls: z.array(z.string()),
});

export const SubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

export const ActivityScheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const ActivityDetailSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  subImages: z.array(SubImageSchema),
  schedules: z.array(ActivityScheduleSchema),
  reviewCount: z.number(),
  rating: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReviewUserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string(),
});

export const ReviewItemSchema = z.object({
  id: z.number(),
  user: ReviewUserSchema,
  activityId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReviewsResponseSchema = z.object({
  averageRating: z.number(),
  totalCount: z.number(),
  reviews: z.array(ReviewItemSchema),
});

export const AvailableTimeSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

export const AvailableScheduleSchema = z.object({
  date: z.string(),
  times: z.array(AvailableTimeSchema),
});

export const CreateReservationRequestSchema = z.object({
  scheduleId: z.number(),
  headCount: z.number(),
});

export const CreateReservationResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: z.string(),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Schedule = z.infer<typeof ScheduleSchema>;
export type CreateActivityRequest = z.infer<typeof CreateActivitySchema>;

export type SubImage = z.infer<typeof SubImageSchema>;
export type ActivitySchedule = z.infer<typeof ActivityScheduleSchema>;
export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;

export type ReviewUser = z.infer<typeof ReviewUserSchema>;
export type ReviewItem = z.infer<typeof ReviewItemSchema>;
export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>;

export const AvailableSchedulesResponseSchema = z.array(
  AvailableScheduleSchema,
);

export type AvailableTime = z.infer<typeof AvailableTimeSchema>;
export type AvailableSchedule = z.infer<typeof AvailableScheduleSchema>;
export type AvailableSchedulesResponse = z.infer<
  typeof AvailableSchedulesResponseSchema
>;

export type CreateReservationRequest = z.infer<
  typeof CreateReservationRequestSchema
>;
export type CreateReservationResponse = z.infer<
  typeof CreateReservationResponseSchema
>;
