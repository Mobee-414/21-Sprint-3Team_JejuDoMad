"use client";

import { useState } from "react";
import { useForm, SubmitHandler, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/input/FormInput";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/features/myActivities/components/form/imageUploader";
import { CategoryInput } from "@/features/myActivities/components/form/categoryInput";
import { ScheduleInput } from "@/features/myActivities/components/form/scheduleInput";
import { AddressSearchModal } from "@/features/myActivities/components/form/addressSearchModal";
import {
  ActivityFormSchema,
  type ActivityFormType,
  type ActivityRequest,
  type Activity,
} from "@/features/myActivities/types/schema";
import { useWatch } from "react-hook-form";
import { useRegisterActivity } from "../../hooks/useRegisterActivity";

interface ActivityFormProps {
  mode: "register" | "edit";
  initialData?: Partial<Activity | ActivityFormType>;
}

export const ActivityForm = ({ mode, initialData }: ActivityFormProps) => {
  const { mutateAsync: registerActivity, isPending } = useRegisterActivity();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ActivityFormType, undefined, ActivityRequest>({
    resolver: zodResolver(ActivityFormSchema) as unknown as Resolver<
      ActivityFormType,
      undefined,
      ActivityRequest
    >,
    defaultValues: initialData
      ? ({
          ...initialData,
          price:
            initialData.price !== undefined ? String(initialData.price) : "",
        } as ActivityFormType)
      : {
          title: "",
          category: "",
          description: "",
          price: "",
          address: "",
          bannerImageUrl: "",
          subImageUrls: [],
          schedules: [{ date: "", startTime: "12:00", endTime: "13:00" }],
        },
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const handleAddressComplete = (address: string) => {
    setValue("address", address, { shouldValidate: true });
    setIsAddressModalOpen(false);
  };

  const bannerImageUrl = useWatch({ control, name: "bannerImageUrl" });
  const subImageUrls = useWatch({ control, name: "subImageUrls" });
  const selectedCategory = useWatch({ control, name: "category" });

  const onSubmit: SubmitHandler<ActivityRequest> = async (data) => {
    try {
      setIsSubmitLoading(true);
      const finalPayload = {
        ...data,
        price: Number(data.price),
      };
      await registerActivity(finalPayload);
    } catch (error) {
      console.error("onSubmit 내부 에러:", error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
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
        type="text"
        inputMode="numeric"
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
        onClick={() => setIsAddressModalOpen(true)}
        errorMessage={errors.address?.message}
      />
      {isAddressModalOpen && (
        <AddressSearchModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onComplete={handleAddressComplete}
        />
      )}

      <ScheduleInput control={control} register={register} errors={errors} />

      <ImageUploader
        bannerValue={bannerImageUrl}
        subImagesValue={subImageUrls}
        onBannerChange={(url) => {
          setValue("bannerImageUrl", url, { shouldValidate: true });
        }}
        onSubImagesChange={(urls) => {
          setValue("subImageUrls", urls, { shouldValidate: true });
        }}
        errors={errors}
      />

      <div className="mt-[32px] flex items-center justify-center">
        <Button
          type="submit"
          disabled={isSubmitLoading || isPending} // 💡 수정됨
          variant="default"
          size="lg"
          className="w-full rounded-[8px] py-[24px] text-[16px] font-bold text-white md:w-[120px]"
        >
          {isSubmitLoading || isPending
            ? "처리 중..."
            : mode === "register"
              ? "등록하기"
              : "수정하기"}
        </Button>
      </div>
    </form>
  );
};
