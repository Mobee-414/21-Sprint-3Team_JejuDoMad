"use client";

import { useActivityDetail } from "../hooks/useActivityDetail";
import ImageGallery from "./header/ImageGallery";
import TitleSection from "./header/TitleSection";
import DescriptionSection from "./header/DescriptionSection";
import ActivityCalender from "./reservation/ActivityCalender";
import KakaoMap from "./map/KakaoMap";
import ReviewSection from "./review/ReviewSection";
import ReservationFormResponsive from "@/features/reservations/components/ReservationFormResponsive";
import type { Schedule } from "@/features/reservations/types/reservation.schema";

type Props = {
  activityId: number;
};

export default function ActivityDetail({ activityId }: Props) {
  const { data, isLoading, error } = useActivityDetail(activityId);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return null;

  return (
    <div className="mx-auto mt-10 w-full max-w-[375px] px-4 min-[744px]:max-w-[744px] min-[744px]:px-6 min-[1024px]:max-w-[1120px] min-[1024px]:px-0">
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <div className="md:max-w-[670px] md:flex-1">
          <ImageGallery
            bannerImageUrl={data.bannerImageUrl}
            subImages={data.subImages}
          />

          <div className="mt-6 min-[744px]:mt-8 min-[1024px]:hidden">
            <TitleSection
              title={data.title}
              category={data.category}
              rating={data.rating}
              reviewCount={data.reviewCount}
              address={data.address}
            />
          </div>

          <div className="mt-6 sm:mt-8">
            <DescriptionSection description={data.description} />
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8">
            <KakaoMap address={data.address} />
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8">
            <ReviewSection activityId={activityId} />
          </div>
        </div>

        <div className="min-[1024px]:w-[410px] min-[1024px]:shrink-0">
          <div className="hidden md:block">
            <TitleSection
              title={data.title}
              category={data.category}
              rating={data.rating}
              reviewCount={data.reviewCount}
              address={data.address}
            />
          </div>

          <div className="mt-10">
            <ReservationFormResponsive
              price={data.price}
              schedules={data.schedules as Schedule[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
