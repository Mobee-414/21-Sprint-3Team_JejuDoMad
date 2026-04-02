import { ReactNode, useState } from "react";
import {
  MyReservationItem,
  MyReservationsResponse,
  ReservationStatus,
} from "@/features/reservations/types/myReservation.schema";
import ReservationCard from "@/features/reservations/components/MyReservationCard";
import ReservationFormResponsive from "@/features/reservations/components/ReservationFormResponsive";
import InfiniteScrollList from "@/shared/components/infinite-scroll/InfiniteScrollList";
import { getMyReservations } from "../api/myReservations.api";
import { useCancelReservation } from "../hooks/useCancelReservation";
import { useActivityDetail } from "@/features/activities/hooks/useActivityDetail";
import { useAvailableSchedule } from "@/features/activities/hooks/useAvailableSchedule";
import MyActivityCardSkeleton from "@/features/myActivities/components/myActivityCardSkeleton";

interface Props {
  selectedStatus: ReservationStatus | null;
  onClickReview: (reservation: MyReservationItem) => void;
  empty: ReactNode;
}

const PAGE_SIZE = 3;

export default function MyReservationList({
  selectedStatus,
  onClickReview,
  empty,
}: Props) {
  const [selectedReservation, setSelectedReservation] =
    useState<MyReservationItem | null>(null);
  const [isReservationFormOpen, setIsReservationFormOpen] = useState(false);

  const cancelReservationMutation = useCancelReservation();

  const getReservationPage = (cursor: number | null) => {
    return getMyReservations({
      cursor,
      size: PAGE_SIZE,
      status: selectedStatus,
    });
  };

  const handleChangeReservation = (reservation: MyReservationItem) => {
    setSelectedReservation(reservation);
    setIsReservationFormOpen(true);
  };

  const handleCloseReservationForm = () => {
    setIsReservationFormOpen(false);
    setSelectedReservation(null);
  };

  const reservationDate = selectedReservation?.date
    ? new Date(selectedReservation.date)
    : null;

  const year = reservationDate ? String(reservationDate.getFullYear()) : "";
  const month = reservationDate
    ? String(reservationDate.getMonth() + 1).padStart(2, "0")
    : "";

  const activityId = selectedReservation?.activity.id ?? 0;

  const { data: activityDetail } = useActivityDetail(activityId);

  const { data: schedulesData } = useAvailableSchedule(activityId, {
    year,
    month,
  });

  const reservationSchedules = schedulesData
    ? schedulesData.flatMap((schedule) =>
        schedule.times.map((time) => ({
          id: time.id,
          date: schedule.date,
          startTime: time.startTime,
          endTime: time.endTime,
        })),
      )
    : [];

  return (
    <>
      {isReservationFormOpen &&
        selectedReservation &&
        activityDetail &&
        schedulesData && (
          <ReservationFormResponsive
            activityId={activityDetail.id}
            mode="edit"
            reservationId={selectedReservation.id}
            initialScheduleId={selectedReservation.scheduleId}
            initialHeadCount={selectedReservation.headCount}
            price={activityDetail.price}
            schedules={reservationSchedules}
            onClose={handleCloseReservationForm}
          />
        )}

      <InfiniteScrollList<
        MyReservationsResponse,
        MyReservationItem,
        number | null
      >
        queryKey={["myReservations", selectedStatus ?? "all"]}
        queryFn={getReservationPage}
        initialPageParam={null}
        getNextCursor={(lastPage) => lastPage.cursorId}
        getItems={(page) => page.reservations}
        renderItem={(reservation) => (
          <ReservationCard
            key={reservation.id}
            {...reservation}
            onClickReview={() => onClickReview(reservation)}
            onCancel={() => cancelReservationMutation.mutate(reservation.id)}
            onChangeReservation={() => handleChangeReservation(reservation)}
          />
        )}
        listClassName="flex flex-col gap-[16px]"
        triggerClassName="h-[1px]"
        empty={empty}
        loading={
          <div className="flex flex-col gap-[16px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <MyActivityCardSkeleton key={i} />
            ))}
          </div>
        }
        error={<div>에러가 발생했습니다.</div>}
        loadingMore={
          <div className="py-4 text-center text-muted-foreground">
            더 불러오는 중...
          </div>
        }
        rootMargin="0px"
      />
    </>
  );
}
