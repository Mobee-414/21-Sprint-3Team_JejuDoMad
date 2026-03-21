import ImageGallery from "./header/ImageGallery";
import TitleSection from "./header/TitleSection";
import DescriptionSection from "./header/DescriptionSection";
import ActivityCalendar from "./reservation/ActivityCalender";
import { ReservationCard } from "@/features/reservations/components/ReservationCard";
import KakaoMap from "./map/KakaoMap";
import ReviewSection from "./review/ReviewSection";

export default function ActivityDetail() {
  return (
    <div className="mx-auto mt-10 max-w-[1120px] px-4 md:px-0">
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <div className="md:w-[670px]">
          <ImageGallery />
          <DescriptionSection />
          <KakaoMap />
          <ReviewSection />
        </div>

        <div className="md:w-[410px]">
          <TitleSection />

          <div className="mt-10 block md:hidden">
            <ActivityCalendar />
          </div>

          <div className="mt-10 hidden md:block">
            <ReservationCard
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
