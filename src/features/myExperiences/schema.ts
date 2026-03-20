import * as z from "zod";
export type { ActivityRequest as ActivityFormType } from "@/features/myExperiences/types/activity.types";

export const activitySchema = z.object({
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
  schedules: z
    .array(
      z.object({
        date: z.string().min(1, "날짜를 선택해 주세요"),
        startTime: z.string().min(1, "시작 시간을 선택해 주세요"),
        endTime: z.string().min(1, "종료 시간을 선택해 주세요"),
      }),
    )
    .min(1, "시간대를 하나 이상 추가해 주세요"),
});
