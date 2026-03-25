import { z } from "zod";

export const ScheduleSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const ActivitySchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.url(),
  subImageUrls: z.array(z.url()).optional(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const MyActivitiesResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  activities: z.array(ActivitySchema),
});

export const ActivityFormSchema = z.object({
  title: z.string().min(1, "제목을 등록해 주세요"),
  category: z.string().min(1, "카테고리를 선택해 주세요"),
  description: z.string().min(1, "내용을 입력해 주세요"),
  price: z
    .string()
    .transform((val) => (val === "" ? undefined : Number(val)))
    .pipe(
      z
        .number({ error: "가격을 입력해 주세요" })
        .min(0, "가격을 입력해 주세요"),
    ),
  address: z.string().min(1, "주소를 입력해 주세요"),
  bannerImageUrl: z.string().min(1, "배너 이미지를 등록해 주세요"),
  subImageUrls: z
    .array(z.string())
    .min(1, "소개 이미지를 1장 이상 등록해 주세요")
    .max(4),
  schedules: z.array(ScheduleSchema).min(1, "시간대를 하나 이상 추가해 주세요"),
});

export type Activity = z.infer<typeof ActivitySchema>;
export type MyActivitiesResponse = z.infer<typeof MyActivitiesResponseSchema>;
export type Schedule = z.infer<typeof ScheduleSchema>;
export type ActivityFormType = z.input<typeof ActivityFormSchema>;
export type ActivityRequest = z.infer<typeof ActivityFormSchema>;
