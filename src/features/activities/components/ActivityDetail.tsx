import ImageGallery from "./header/ImageGallery";
import TitleSection from "./header/TitleSection";
import DescriptionSection from "./header/DescriptionSection";
import ActivityCalender from "./reservation/ActivityCalender";
import ReservationForm from "@/features/reservations/components/ReservationForm";
import KakaoMap from "./map/KakaoMap";
import ReviewSection from "./review/ReviewSection";

export default function ActivityDetail() {
  return (
    <div className="mx-auto mt-10 w-full max-w-[375px] px-4 sm:max-w-[744px] sm:px-6 md:px-0 lg:max-w-[1120px]">
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <div className="md:max-w-[670px] md:flex-1">
          <ImageGallery />

          <div className="mt-6 sm:mt-8 md:hidden">
            <TitleSection />
          </div>

          <div className="mt-6 sm:mt-8">
            <DescriptionSection />
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8">
            <KakaoMap />
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8">
            <ReviewSection />
          </div>
        </div>

        <div className="md:w-[320px] lg:w-[410px]">
          <div className="hidden md:block">
            <TitleSection />
          </div>

          <div className="mt-10 block md:hidden">
            <ActivityCalender />
          </div>

          <div className="mt-10 hidden md:block">
            <ReservationForm
              price={25000}
              schedules={[
                { date: "2026-03-22", startTime: "10:00", endTime: "11:00" },
                { date: "2026-03-22", startTime: "14:00", endTime: "15:00" },
                { date: "2026-03-23", startTime: "12:00", endTime: "13:00" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
