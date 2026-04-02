"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import FormInput from "@/components/ui/input/FormInput";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/features/myActivities/components/form/imageUploader";
import { CategoryInput } from "@/features/myActivities/components/form/categoryInput";
import { ScheduleInput } from "@/features/myActivities/components/form/scheduleInput";
import { AddressSearchModal } from "@/features/myActivities/components/form/addressSearchModal";
import { AddressInput } from "@/features/myActivities/components/form/addressInput";
import {
  type ActivityRequest,
  type ActivityDetail,
} from "@/features/activities/schemas/activity.schema";
import { useCreateActivity } from "@/features/activities/hooks/useCreateActivity";
import { useUpdateMyActivity } from "@/features/myActivities/hooks/useUpdateMyActivity";
import { useActivityForm } from "@/features/myActivities/hooks/useActivityForm";
import { formatPrice } from "@/shared/utils/formatPrice";
import { AxiosError } from "axios";

interface ActivityFormProps {
  mode: "register" | "edit";
  initialData?: Partial<ActivityDetail>;
}

export const ActivityForm = ({ mode, initialData }: ActivityFormProps) => {
  const router = useRouter();
  const { mutateAsync: createActivity } = useCreateActivity();
  const { mutateAsync: updateActivity } = useUpdateMyActivity(
    Number(initialData?.id),
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useActivityForm({ mode, initialData });

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [tempData, setTempData] = useState<ActivityRequest | null>(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const titleValue = watch("title") || "";
  const descriptionValue = watch("description") || "";
  const bannerImageUrl = watch("bannerImageUrl");
  const subImageUrls = watch("subImageUrls") || [];
  const selectedCategory = watch("category");

  const handleAddressComplete = (address: string) => {
    setValue("address", address, { shouldValidate: true });
    setIsAddressModalOpen(false);
  };

  const onSubmit: SubmitHandler<ActivityRequest> = (data) => {
    setTempData(data);
    setIsConfirmOpen(true);
  };

  const handleRealSubmit = async () => {
    if (!tempData) return;
    console.log("tempData.schedules:", tempData.schedules);
    try {
      setIsSubmitLoading(true);
      setIsConfirmOpen(false);

      const combinedAddress =
        `${tempData.address} ${tempData.detailAddress || ""}`.trim();
      const numericPrice = Number(String(tempData.price).replace(/,/g, ""));

      const validSchedules = tempData.schedules.filter(
        (s) => s.date && s.date.trim() !== "",
      );
      const originalScheduleIds = (initialData?.schedules ?? [])
        .map((s) => s.id)
        .filter((id): id is number => id !== undefined);

      const schedulesToAdd = validSchedules.filter((s) => !s.id);
      const scheduleIdsToRemove = originalScheduleIds.filter(
        (id) => !validSchedules.some((s) => s.id === id),
      );

      const initialSubImages = initialData?.subImages || [];
      const currentSubImageUrls = tempData.subImageUrls || [];
      const subImageIdsToRemove = initialSubImages
        .filter((img) => !currentSubImageUrls.includes(img.imageUrl))
        .map((img) => img.id);

      const subImageUrlsToAdd = currentSubImageUrls.filter(
        (url) => !initialSubImages.some((img) => img.imageUrl === url),
      );

      if (mode === "register") {
        await createActivity({
          ...tempData,
          address: combinedAddress,
          price: numericPrice,
          schedules: validSchedules,
        });
        setSuccessMessage("체험 등록이 완료되었습니다.");
      } else {
        await updateActivity({
          title: tempData.title,
          category: tempData.category,
          description: tempData.description,
          price: numericPrice,
          address: combinedAddress,
          bannerImageUrl: tempData.bannerImageUrl,
          subImageIdsToRemove,
          subImageUrlsToAdd,
          schedulesToAdd,
          scheduleIdsToRemove,
        });
        setSuccessMessage("체험 수정이 완료되었습니다.");
      }

      setIsSuccessOpen(true);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setErrorMessage(
        axiosError.response?.data?.message || "오류가 발생했습니다.",
      );
      setIsErrorOpen(true);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col">
          <FormInput
            {...register("title")}
            placeholder="제목을 입력해 주세요"
            label="제목"
            maxLength={20}
          />
          <p className="pr-2 text-right text-xs text-gray-400">
            {titleValue.length} / 20
          </p>
        </div>

        <CategoryInput
          value={selectedCategory}
          onChange={(val) =>
            setValue("category", val, { shouldValidate: true })
          }
          error={errors.category?.message}
        />

        <div className="flex flex-col">
          <FormInput
            {...register("description")}
            label="설명"
            isTextarea
            placeholder="체험에 대해 설명해 주세요"
            variant="experience"
            className="h-[160px] !bg-white"
            maxLength={500}
            errorMessage={errors.description?.message}
          />
          <p className="pr-2 text-right text-xs text-gray-400">
            {descriptionValue.length} / 500
          </p>
        </div>

        <FormInput
          {...register("price", {
            onChange: (e) => {
              const { value } = e.target;
              e.target.value = formatPrice(value);
            },
          })}
          label="가격"
          type="text"
          inputMode="numeric"
          placeholder="가격을 입력해 주세요"
          variant="experience"
          errorMessage={errors.price?.message}
          className="!bg-white"
        />

        <AddressInput
          register={register}
          errors={errors}
          onSearchClick={() => setIsAddressModalOpen(true)}
        />
        {isAddressModalOpen && (
          <AddressSearchModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            onComplete={handleAddressComplete}
          />
        )}

        <ScheduleInput
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

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
            disabled={isSubmitLoading}
            variant="default"
            size="lg"
            className="w-full rounded-[8px] py-[24px] text-[16px] font-bold text-white md:w-[120px]"
          >
            {isSubmitLoading
              ? "처리 중..."
              : mode === "register"
                ? "등록하기"
                : "수정하기"}
          </Button>
        </div>
      </form>
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="flex w-[320px] flex-col items-center gap-[24px] rounded-[24px] p-[30px] md:w-[400px]">
          <DialogTitle className="pt-[20px] text-center text-[18px] font-bold text-gray-950">
            체험을 {mode === "register" ? "등록" : "수정"}하시겠습니까?
          </DialogTitle>

          <div className="flex w-full gap-[12px]">
            <Button
              variant="outline"
              className="h-[48px] flex-1 rounded-[12px]"
              onClick={() => setIsConfirmOpen(false)}
            >
              아니오
            </Button>
            <Button
              className="h-[48px] flex-1 rounded-[12px]"
              onClick={handleRealSubmit}
            >
              네
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="flex w-[320px] flex-col items-center gap-[24px] rounded-[24px] p-[30px] md:w-[400px]">
          <DialogTitle className="pt-[40px] text-center text-[18px] font-medium">
            {successMessage}
          </DialogTitle>
          <Button
            className="h-[42px] w-[138px] rounded-[8px] text-[14px] font-semibold md:h-[48px] md:rounded-[12px] md:text-[16px]"
            onClick={() => {
              setIsSuccessOpen(false);
              if (mode === "edit") {
                router.back();
              } else {
                router.push("/mypage/activities");
              }
            }}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={isErrorOpen} onOpenChange={setIsErrorOpen}>
        <DialogContent className="flex w-[320px] flex-col items-center gap-[24px] rounded-[24px] p-[30px] md:w-[400px]">
          <DialogTitle className="pt-[20px] text-center text-[18px] font-bold text-gray-950">
            {mode === "register" ? "등록" : "수정"} 실패
          </DialogTitle>

          <p className="text-center text-[15px] text-gray-600">
            {errorMessage}
          </p>

          <Button
            className="h-[48px] w-full rounded-[12px] font-bold"
            onClick={() => setIsErrorOpen(false)}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
