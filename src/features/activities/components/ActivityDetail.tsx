"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActivityDetail } from "../hooks/useActivityDetail";
import { useMe } from "@/features/mypage/users/hooks/useMe";
import ImageGallery from "./header/ImageGallery";
import TitleSection from "./header/TitleSection";
import DescriptionSection from "./header/DescriptionSection";
import KakaoMap from "./map/KakaoMap";
import ReviewSection from "./review/ReviewSection";
import { useDeleteActivity } from "@/features/myActivities/hooks/useDeleteActivity";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReservationFormResponsive from "@/features/reservations/components/ReservationFormResponsive";
import type { Schedule } from "@/features/reservations/types/reservation.schema";

type Props = {
  activityId: number;
};

export default function ActivityDetail({ activityId }: Props) {
  const router = useRouter();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

  const { data: activity, isLoading, error } = useActivityDetail(activityId);
  const { data: me } = useMe();
  const { mutate: deleteActivity, isPending } = useDeleteActivity();

  if (isLoading) return <div>로딩중...</div>;
  if (error || !activity) return <div>에러 발생</div>;

  const isOwner = me?.id === activity.userId;

  const handleRealDelete = () => {
    deleteActivity(activityId, {
      onSuccess: () => {
        setIsDeleteConfirmOpen(false);
        setIsDeleteSuccessOpen(true);
      },
    });
  };

  return (
    <>
      <div className="mx-auto mt-10 w-full max-w-[375px] px-4 min-[744px]:max-w-[744px] min-[744px]:px-6 min-[1024px]:max-w-[1120px] min-[1024px]:px-0">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div className="md:max-w-[670px] md:flex-1">
            <ImageGallery
              bannerImageUrl={activity.bannerImageUrl}
              subImages={activity.subImages ?? []}
            />

            <div className="mt-6 min-[744px]:mt-8 min-[1024px]:hidden">
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
            </div>

            <div className="mt-6 sm:mt-8">
              <DescriptionSection description={activity.description} />
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8">
              <KakaoMap address={activity.address} />
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8">
              <ReviewSection activityId={activityId} />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ReservationFormResponsive
            activityId={activityId}
            price={activity.price}
            schedules={activity.schedules as Schedule[]}
          />
          <div className="min-[1024px]:w-[410px] min-[1024px]:shrink-0">
            <div className="hidden min-[1024px]:block">
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
            </div>

            <div className="mt-10">
              <ReservationFormResponsive
                activityId={activityId}
                price={activity.price}
                schedules={activity.schedules as Schedule[]}
              />
            </div>
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
              className="h-[48px] flex-1 rounded-[12px] bg-red-500 text-white"
              onClick={handleRealDelete}
              disabled={isPending}
            >
              {isPending ? "삭제 중..." : "네"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteSuccessOpen} onOpenChange={setIsDeleteSuccessOpen}>
        <DialogContent className="flex w-[320px] flex-col items-center gap-[24px] rounded-[24px] p-[30px] md:w-[400px]">
          <DialogTitle className="pt-[40px] text-center text-[18px] font-medium">
            체험 삭제가 완료되었습니다.
          </DialogTitle>
          <Button
            className="h-[42px] w-[138px] rounded-[8px] text-[14px] font-semibold md:h-[48px] md:rounded-[12px] md:text-[16px]"
            onClick={() => router.push("/mypage/activities")}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
