"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActivityDetail } from "../hooks/useActivityDetail";
import { useMe } from "@/features/mypage/users/hooks/useMe";
import ImageGallery from "./header/imageGallery";
import TitleSection from "./header/TitleSection";
import DescriptionSection from "./header/DescriptionSection";
import KakaoMap from "./map/KakaoMap";
import ReviewSection from "./review/ReviewSection";
import { useDeleteActivity } from "@/features/myActivities/hooks/useDeleteActivity";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReservationFormResponsive from "@/features/reservations/components/ReservationFormResponsive";
import type { Schedule } from "@/features/reservations/types/myReservation.schema";
import { AxiosError } from "axios";

import { ImageGallerySkeleton } from "@/components/skeleton/imageGallerySkeleton";
import { TitleSectionSkeleton } from "@/components/skeleton/titleSectionSkeletion";
import { DescriptionSkeleton } from "@/components/skeleton/descriptionSkeletion";
import { MapSkeleton } from "@/components/skeleton/mapSkeletion";
import { ReservationSkeleton } from "@/components/skeleton/reservationSkeletion";

type Props = {
  activityId: number;
};

export default function ActivityDetail({ activityId }: Props) {
  const router = useRouter();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [isDeleteErrorOpen, setIsDeleteErrorOpen] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const { data: activity, isLoading, error } = useActivityDetail(activityId);
  const { data: me } = useMe();
  const { mutate: deleteActivity, isPending } = useDeleteActivity();

  if (error || !activity) return <div>에러 발생</div>;

  const isOwner = me?.id === activity.userId;

  const handleRealDelete = () => {
    deleteActivity(activityId, {
      onSuccess: () => {
        setIsDeleteConfirmOpen(false);
        setSuccessMessage("체험 삭제가 완료되었습니다.");
        setIsSuccessOpen(true);
      },
      onError: (error) => {
        setIsDeleteConfirmOpen(false);
        const axiosError = error as AxiosError<{ message: string }>;
        const msg = axiosError.response?.data?.message || "삭제 실패";
        setDeleteErrorMessage(msg);
        setIsDeleteErrorOpen(true);
      },
    });
  };

  return (
    <>
      <div className="mx-auto mt-10 w-full max-w-[375px] px-4 min-[744px]:max-w-[744px] min-[744px]:px-6 min-[1024px]:max-w-[1120px] min-[1024px]:px-0">
        <div className="flex flex-col gap-6 min-[1024px]:flex-row min-[1024px]:gap-10">
          <div className="min-[1024px]:max-w-[670px] min-[1024px]:flex-1">
            {isLoading ? (
              <ImageGallerySkeleton />
            ) : (
              <ImageGallery
                bannerImageUrl={activity.bannerImageUrl}
                subImages={activity.subImages ?? []}
              />
            )}

            <div className="mt-6 min-[744px]:mt-8 min-[1024px]:hidden">
              {isLoading ? (
                <TitleSectionSkeleton />
              ) : (
                <TitleSection
                  title={activity.title}
                  category={activity.category}
                  rating={activity.rating}
                  reviewCount={activity.reviewCount}
                  address={activity.address}
                  isOwner={isOwner}
                  activityId={activityId}
                  onDelete={() => setIsDeleteConfirmOpen(true)}
                />
              )}
            </div>

            <div className="mt-6 sm:mt-8">
              {isLoading ? (
                <DescriptionSkeleton />
              ) : (
                <DescriptionSection description={activity.description} />
              )}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8">
              {isLoading ? (
                <MapSkeleton />
              ) : (
                <KakaoMap address={activity.address} />
              )}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8">
              <ReviewSection activityId={activityId} />
            </div>
          </div>

          <div className="flex flex-col gap-10 min-[1024px]:w-[410px] min-[1024px]:shrink-0">
            <div className="hidden min-[1024px]:block">
              {isLoading ? (
                <TitleSectionSkeleton />
              ) : (
                <TitleSection
                  title={activity.title}
                  category={activity.category}
                  rating={activity.rating}
                  reviewCount={activity.reviewCount}
                  address={activity.address}
                  isOwner={isOwner}
                  activityId={activityId}
                  onDelete={() => setIsDeleteConfirmOpen(true)}
                />
              )}
            </div>
            {!isOwner &&
              (isLoading ? (
                <ReservationSkeleton />
              ) : (
                <ReservationFormResponsive
                  activityId={activityId}
                  price={activity.price}
                  schedules={activity.schedules as Schedule[]}
                />
              ))}
          </div>
        </div>
      </div>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="flex w-[320px] flex-col items-center gap-[24px] rounded-[24px] p-[30px] md:w-[400px]">
          <DialogTitle className="pt-[20px] text-center text-[18px] font-bold text-gray-950">
            체험을 삭제하시겠습니까?
          </DialogTitle>
          <div className="flex w-full gap-[12px]">
            <Button
              variant="outline"
              className="h-[48px] flex-1 rounded-[12px]"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              아니오
            </Button>
            <Button
              className="h-[48px] flex-1 rounded-[12px]"
              onClick={handleRealDelete}
              disabled={isPending}
            >
              {isPending ? "삭제 중..." : "네"}
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
            onClick={() => router.push("/mypage/activities")}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteErrorOpen} onOpenChange={setIsDeleteErrorOpen}>
        <DialogContent>
          <DialogTitle>삭제 실패</DialogTitle>
          <p>{deleteErrorMessage}</p>
          <Button onClick={() => setIsDeleteErrorOpen(false)}>확인</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
