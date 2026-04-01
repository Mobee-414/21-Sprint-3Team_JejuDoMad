import { z } from "zod";

//  공통 스키마

export const ScheduleSchema = z.object({
  id: z.number().optional(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
export type Schedule = z.infer<typeof ScheduleSchema>;

export const SubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});
export type SubImage = z.infer<typeof SubImageSchema>;

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

// 체험 등록수정 폼 스키마 유효성 검사

export const ActivityFormSchema = z.object({
  title: z.string().min(1, "제목을 등록해 주세요"),
  category: z.string().min(1, "카테고리를 선택해 주세요"),
  description: z.string().min(1, "내용을 입력해 주세요"),
  price: z
    .string()
    .min(1, "가격을 입력해 주세요")
    .refine(
      (val) => !isNaN(Number(val.replace(/,/g, ""))),
      "숫자만 입력 가능합니다",
    )
    .transform((val) => Number(val.replace(/,/g, ""))),
  address: z.string().min(1, "주소를 입력해 주세요"),
  detailAddress: z.string().optional(),
  bannerImageUrl: z.string().min(1, "배너 이미지를 등록해 주세요"),
  subImageUrls: z
    .array(z.string())
    .min(1, "소개 이미지를 1장 이상 등록해 주세요")
    .max(4),
  schedules: z.array(ScheduleSchema).min(1, "시간대를 하나 이상 추가해 주세요"),
});

export type ActivityFormInput = z.input<typeof ActivityFormSchema>;
export type ActivityRequest = z.output<typeof ActivityFormSchema>;

// 조회
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

export const ActivityDetailSchema = ActivityListItemSchema.extend({
  subImages: z.array(SubImageSchema).optional(),
  schedules: z
    .array(
      z.object({
        id: z.number().optional(),
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .optional(),
});
export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;

export const ActivitiesListResponseSchema = z.object({
  cursorId: z.number().nullable().optional(),
  totalCount: z.number(),
  activities: z.array(ActivityListItemSchema),
});

export type ActivitiesListResponse = z.infer<
  typeof ActivitiesListResponseSchema
>;

// 예약 관련

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
export type CreateReservationResponse = z.infer<
  typeof CreateReservationResponseSchema
>;

//  리뷰
export const ReviewItemSchema = z.object({
  id: z.number(),
  user: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImageUrl: z.string(),
  }),
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

export const ErrorResponseSchema = z.object({
  message: z.string(),
});

// 이미지 업로드 응답
export const ActivityImageResponseSchema = z.object({
  activityImageUrl: z.string(),
});

// 이미지 업로드 응답 타입
export type ActivityImageResponse = z.infer<typeof ActivityImageResponseSchema>;

export const PostActivityResponseSchema = z
  .object({
    id: z.number(),
    title: z.string(),
  })
  .loose();
export type PostActivityResponse = z.infer<typeof PostActivityResponseSchema>;

export const UpdateActivityRequestSchema = z.object({
  title: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  address: z.string().optional(),
  bannerImageUrl: z.string().optional(),
  subImageUrlsToAdd: z.array(z.string()).optional(),
  subImageIdsToRemove: z.array(z.number()).optional(),
  schedulesToAdd: z
    .array(
      z.object({
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .optional(),
  scheduleIdsToRemove: z.array(z.number()).optional(),
});

export type UpdateActivityRequest = z.infer<typeof UpdateActivityRequestSchema>;
