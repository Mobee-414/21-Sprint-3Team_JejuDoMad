import { MyReservationItem } from "@/features/reservations/types/reservation";
import ReservationCard from "@/components/ui/card/MyReservationCard";

interface Props {
  reservations: MyReservationItem[];
  onClickReview: (reservation: MyReservationItem) => void;
}

export default function MyReservationList({
  reservations,
  onClickReview,
}: Props) {
  if (reservations.length === 0) {
    return <div>예약 내역이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-[16px]">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          {...reservation}
          onClickReview={() => onClickReview(reservation)}
        />
      ))}
    </div>
  );
}
