"use client";

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  type Resolver,
} from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/input/FormInput";
import { Dropdown } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/features/myExperiences/components/imageUploader";
import { cn } from "@/lib/utils";
import {
  activitySchema,
  type ActivityFormType,
} from "@/features/myExperiences/schema";
import { useWatch } from "react-hook-form";

const CATEGORIES = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

interface ActivityFormProps {
  mode: "register" | "edit";
  initialData?: ActivityFormType;
}

export const ActivityForm = ({ mode, initialData }: ActivityFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormType>({
    resolver: zodResolver(
      activitySchema,
    ) as unknown as Resolver<ActivityFormType>,
    defaultValues: initialData || {
      title: "",
      category: "",
      description: "",
      price: "" as unknown as number,
      address: "",
      bannerImageUrl: "",
      subImageUrls: [],
      schedules: [{ date: "", startTime: "12:00", endTime: "13:00" }],
    },
  });

  const bannerImageUrl = useWatch({ control, name: "bannerImageUrl" });
  const subImageUrls = useWatch({ control, name: "subImageUrls" });
  const selectedCategory = useWatch({ control, name: "category" });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const onSubmit: SubmitHandler<ActivityFormType> = (data) => {
    console.log(`${mode === "register" ? "등록" : "수정"} 데이터:`, data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[32px] pb-[80px] text-gray-950"
    >
      <FormInput
        {...register("title")}
        label="제목"
        placeholder="제목을 입력해 주세요"
        variant="experience"
        className="!bg-white"
        errorMessage={errors.title?.message}
      />

      <div className="flex flex-col gap-[10px]">
        <label className="text-[16px] font-medium text-gray-950">
          카테고리
        </label>
        <Dropdown matchTriggerWidth className="w-full">
          <Dropdown.Trigger
            className={cn(
              "flex h-[56px] w-full items-center justify-between rounded-[16px] border border-gray-100 bg-white p-[16px] text-[16px] shadow-[0_2px_6px_0_#00000005] transition-all focus:border-black",
              !selectedCategory ? "text-gray-400" : "text-gray-950",
              errors.category && "border-red-500",
            )}
          >
            {selectedCategory || "카테고리 선택"}
            <svg
              className="h-[20px] w-[20px] text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Dropdown.Trigger>

          <Dropdown.Menu className="rounded-[16px] border border-gray-100 bg-white py-[8px] shadow-xl">
            {CATEGORIES.map((category) => (
              <Dropdown.Item
                key={category}
                onClick={() =>
                  setValue("category", category, { shouldValidate: true })
                }
                className={cn(
                  "px-[16px] py-[12px] text-left transition-colors hover:bg-gray-50",
                  selectedCategory === category && "bg-gray-50 font-bold",
                )}
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <div className="min-h-[20px] px-[8px]">
          {errors.category && (
            <p className="text-[14px] text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <FormInput
        {...register("description")}
        label="설명"
        isTextarea
        placeholder="체험에 대해 설명해 주세요"
        variant="experience"
        className="h-[160px] !bg-white"
        errorMessage={errors.description?.message}
      />

      <FormInput
        {...register("price")}
        label="가격"
        type="number"
        placeholder="가격을 입력해 주세요"
        variant="experience"
        errorMessage={errors.price?.message}
        className="!bg-white"
      />

      <FormInput
        {...register("address")}
        label="주소"
        placeholder="주소를 검색해 주세요"
        variant="experience"
        readOnly
        className="cursor-pointer !bg-white"
        onClick={() => console.log("카카오 API 호출")}
        errorMessage={errors.address?.message}
      />

      <div className="flex flex-col gap-[16px]">
        <label className="text-16-b text-gray-950">예약 가능한 시간대</label>

        <div className="flex flex-col gap-[16px]">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-[8px] max-md:flex-col md:gap-[12px]"
            >
              <div className="w-full md:flex-1">
                <input
                  type="date"
                  {...register(`schedules.${index}.date`)}
                  className={cn(
                    "w-full rounded-[16px] border border-gray-100 bg-white p-[16px] transition-all outline-none focus:border-black",
                    errors.schedules?.[index]?.date && "border-red-500",
                  )}
                />
              </div>

              <div className="flex w-full items-center gap-[6px] md:w-auto md:shrink-0 md:gap-[12px]">
                <div className="flex-1 md:w-[128px]">
                  <input
                    type="time"
                    {...register(`schedules.${index}.startTime`)}
                    className="w-full rounded-[16px] border border-gray-100 bg-white p-[16px] px-[8px] text-[14px] outline-none focus:border-black md:px-[16px] md:text-[16px]"
                  />
                </div>

                <span className="shrink-0 text-gray-400">—</span>

                <div className="flex-1 md:w-[128px]">
                  <input
                    type="time"
                    {...register(`schedules.${index}.endTime`)}
                    className="w-full rounded-[16px] border border-gray-100 bg-white p-[16px] px-[8px] text-[14px] outline-none focus:border-black md:px-[16px] md:text-[16px]"
                  />
                </div>

                <div className="flex shrink-0 items-center justify-center">
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          date: "",
                          startTime: "12:00",
                          endTime: "13:00",
                        })
                      }
                      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
                    >
                      <Image
                        src="/images/buttons/btn_add.svg"
                        alt="추가"
                        width={44}
                        height={44}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
                    >
                      <Image
                        src="/images/buttons/btn_remove.svg"
                        alt="삭제"
                        width={44}
                        height={44}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {errors.schedules && (
          <p className="text-[14px] text-red-500">
            {errors.schedules.message || errors.schedules.root?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[8px]">
        <ImageUploader
          bannerValue={bannerImageUrl}
          subImagesValue={subImageUrls}
          onBannerChange={(url) =>
            setValue("bannerImageUrl", url, { shouldValidate: true })
          }
          onSubImagesChange={(urls) =>
            setValue("subImageUrls", urls, { shouldValidate: true })
          }
        />

        <div className="min-h-[20px] px-[8px]">
          {(errors.bannerImageUrl || errors.subImageUrls) && (
            <p className="text-[14px] text-red-500">
              {errors.bannerImageUrl?.message || errors.subImageUrls?.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-[32px] flex items-center justify-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="default"
          size="lg"
          className="w-full rounded-[8px] py-[24px] text-[16px] font-bold text-white md:w-[120px]"
        >
          {isSubmitting
            ? "처리 중..."
            : mode === "register"
              ? "등록하기"
              : "수정하기"}
        </Button>
      </div>
    </form>
  );
};
