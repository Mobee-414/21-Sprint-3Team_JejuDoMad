"use client";

import { useForm, SubmitHandler, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/input/FormInput";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/features/myActivities/components/form/imageUploader";
import { CategoryInput } from "@/features/myActivities/components/form/categoryInput";
import { ScheduleInput } from "@/features/myActivities/components/form/scheduleInput";

import {
  activitySchema,
  type ActivityFormType,
} from "@/features/myActivities/schema";
import { useWatch } from "react-hook-form";

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

      <CategoryInput
        value={selectedCategory}
        onChange={(val) => setValue("category", val, { shouldValidate: true })}
        error={errors.category?.message}
      />

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

      <ScheduleInput control={control} register={register} errors={errors} />

      <ImageUploader
        bannerValue={bannerImageUrl}
        subImagesValue={subImageUrls}
        onBannerChange={(url) =>
          setValue("bannerImageUrl", url, { shouldValidate: true })
        }
        onSubImagesChange={(urls) =>
          setValue("subImageUrls", urls, { shouldValidate: true })
        }
        errors={errors}
      />

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
