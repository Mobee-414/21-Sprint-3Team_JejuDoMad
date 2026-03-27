import { ReactNode } from "react";
import {
  MyReservationItem,
  MyReservationsResponse,
  ReservationStatus,
} from "@/features/reservations/types/reservation.schema";
import ReservationCard from "@/features/reservations/components/MyReservationCard";
import InfiniteScrollList from "@/shared/components/infinite-scroll/InfiniteScrollList";
import {
  getMyReservations,
  cancelMyReservation,
} from "../api/myReservations.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const cancelReservationMutation = useMutation({
    mutationFn: cancelMyReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myReservations"],
      });
    },
  });

  const getReservationPage = (cursor: number | null) => {
    return getMyReservations({
      cursor,
      size: PAGE_SIZE,
      status: selectedStatus,
    });
  };

  return (
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
        />
      )}
      listClassName="flex flex-col gap-[16px]"
      triggerClassName="h-[1px]"
      empty={empty}
      loading={<div>로딩중</div>}
      error={<div>에러가 발생했습니다.</div>}
      loadingMore={
        <div className="py-4 text-center text-muted-foreground">
          더 불러오는 중...
        </div>
      }
      rootMargin="0px"
    />
  );
}
