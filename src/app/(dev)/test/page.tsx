import { ReservationCard } from "@/features/reservations/components/ReservationCard";

const mockTimeSlots = [
  { id: "1", time: "09:00", isAvailable: true },
  { id: "2", time: "10:00", isAvailable: true },
  { id: "3", time: "11:00", isAvailable: false },
  { id: "4", time: "13:00", isAvailable: true },
  { id: "5", time: "14:00", isAvailable: true },
];

export default function ReservationTestPage() {
  return (
    <main>
      <section>
        <h1>Reservation Test</h1>
        <p>예약 카드 UI 테스트 페이지</p>
      </section>

      <section>
        <ReservationCard />
      </section>
    </main>
  );
}
