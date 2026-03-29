import { z } from "zod";

// 체험 리스트
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
export type ActivityListItem = z.infer<typeof ActivityListItemSchema>;

export const ActivitiesListResponseSchema = z.object({
  cursorId: z.number().nullable().optional(),
  totalCount: z.number(),
  activities: z.array(ActivityListItemSchema),
});
export type ActivitiesListResponse = z.infer<
  typeof ActivitiesListResponseSchema
>;

// 공통 - 서브 이미지
export const SubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});
export type SubImage = z.infer<typeof SubImageSchema>;

// 예약 가능 스케줄
export const AvailableTimeSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});
export type AvailableTime = z.infer<typeof AvailableTimeSchema>;

export const AvailableScheduleSchema = z.object({
  date: z.string(),
  times: z.array(AvailableTimeSchema),
});
export type AvailableSchedule = z.infer<typeof AvailableScheduleSchema>;

export const AvailableSchedulesResponseSchema = z.array(
  AvailableScheduleSchema,
);
export type AvailableSchedulesResponse = z.infer<
  typeof AvailableSchedulesResponseSchema
>;

// 체험 등록
export const ScheduleSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
export type Schedule = z.infer<typeof ScheduleSchema>;

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
export type CreateActivityRequest = z.infer<typeof CreateActivitySchema>;

export const CreateActivityResponseSchema = z.object({
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
  subImages: z.array(SubImageSchema),
  schedules: z.array(AvailableScheduleSchema),
});
export type CreateActivityResponse = z.infer<
  typeof CreateActivityResponseSchema
>;

// 체험 이미지 업로드
export const ActivityImageResponseSchema = z.object({
  activityImageUrl: z.string(),
});
export type ActivityImageResponse = z.infer<typeof ActivityImageResponseSchema>;

// 체험 상세
export const ActivityScheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
export type ActivitySchedule = z.infer<typeof ActivityScheduleSchema>;

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
export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;

// 체험 예약 신청
export const CreateReservationRequestSchema = z.object({
  scheduleId: z.number(),
  headCount: z.number(),
});
export type CreateReservationRequest = z.infer<
  typeof CreateReservationRequestSchema
>;

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
export type CreateReservationResponse = z.infer<
  typeof CreateReservationResponseSchema
>;

// 체험 리뷰
export const ReviewUserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string(),
});
export type ReviewUser = z.infer<typeof ReviewUserSchema>;

export const ReviewItemSchema = z.object({
  id: z.number(),
  user: ReviewUserSchema,
  activityId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ReviewItem = z.infer<typeof ReviewItemSchema>;

export const ReviewsResponseSchema = z.object({
  averageRating: z.number(),
  totalCount: z.number(),
  reviews: z.array(ReviewItemSchema),
});
export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>;

// 공통 에러
export const ErrorResponseSchema = z.object({
  message: z.string(),
});
