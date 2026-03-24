import { MyReservationItem } from "@/features/reservations/types/reservation";
import ReservationCard from "@/components/ui/card/MyReservationCard";
import InfiniteScrollList from "@/shared/components/infinite-scroll/InfiniteScrollList";
import ReservationEmptyState from "./ReservationEmptyState";

interface Props {
  reservations: MyReservationItem[];
}

type ReservationPage = {
  reservations: MyReservationItem[];
  nextCursor: number | null;
};

const PAGE_SIZE = 3;

export default function MyReservationList({ reservations }: Props) {
  const getReservationPage = (
    cursor: number | null,
  ): Promise<ReservationPage> => {
    const startIndex = cursor ?? 0;
    const endIndex = startIndex + PAGE_SIZE;

    const currentReservations = reservations.slice(startIndex, endIndex);
    const nextCursor = endIndex < reservations.length ? endIndex : null;

    return Promise.resolve({
      reservations: currentReservations,
      nextCursor,
    });
  };

  const filteredReservations = [];

  return (
    <InfiniteScrollList<ReservationPage, MyReservationItem, number | null>
      queryKey={["myReservations", reservations.length]}
      queryFn={getReservationPage}
      initialPageParam={0}
      getNextCursor={(lastPage) => lastPage.nextCursor}
      getItems={(page) => page.reservations}
      renderItem={(reservation) => (
        <ReservationCard key={reservation.id} {...reservation} />
      )}
      listClassName="flex flex-col gap-[16px]"
      triggerClassName="h-[1px]"
      empty={<ReservationEmptyState />}
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
