"use client";

import { useState } from "react";
import { useForm, SubmitHandler, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/input/FormInput";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/features/myActivities/components/form/imageUploader";
import { CategoryInput } from "@/features/myActivities/components/form/categoryInput";
import { ScheduleInput } from "@/features/myActivities/components/form/scheduleInput";
import { AddressSearchModal } from "@/features/myActivities/components/form/addressSearchModal";
import { AddressInput } from "@/features/myActivities/components/form/addressInput";
import {
  ActivityFormSchema,
  type ActivityFormType,
  type ActivityRequest,
  type Activity,
} from "@/features/myActivities/types/schema";
import { useWatch } from "react-hook-form";
import { useRegisterActivity } from "../../hooks/useRegisterActivity";
import { formatPrice, parsePriceToNumber } from "@/shared/utils/formatPrice";

interface ActivityFormProps {
  mode: "register" | "edit";
  initialData?: Partial<Activity | ActivityFormType>;
}

export const ActivityForm = ({ mode, initialData }: ActivityFormProps) => {
  const { mutateAsync: registerActivity, isPending } = useRegisterActivity();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [tempData, setTempData] = useState<ActivityRequest | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
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

  const onSubmit: SubmitHandler<ActivityRequest> = (data) => {
    setTempData(data);
    setIsConfirmOpen(true);
  };

  const handleRealSubmit = async () => {
    if (!tempData) return;
    try {
      setIsSubmitLoading(true);
      setIsConfirmOpen(false);
      const combinedAddress =
        `${tempData.address} ${tempData.detailAddress || ""}`.trim();
      const finalPayload = {
        ...tempData,
        price: parsePriceToNumber(String(tempData.price)),
        address: combinedAddress,
      };
      await registerActivity(finalPayload);
      setIsSuccessOpen(true);
    } catch (error) {
      console.error("전송 중 에러 발생:", error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
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
          onChange={(val) =>
            setValue("category", val, { shouldValidate: true })
          }
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
            disabled={isSubmitLoading || isPending}
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
            체험 {mode === "register" ? "등록" : "수정"}이 완료되었습니다.
          </DialogTitle>
          <Button
            className="h-[42px] w-[138px] rounded-[8px] text-[14px] font-semibold md:h-[48px] md:rounded-[12px] md:text-[16px]"
            onClick={() => (window.location.href = "/mypage/activities")}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
