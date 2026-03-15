import { Calendar } from "@/components/ui/calendar";

const mockActivity = {
  price: 10000,
  schedules: [
    {
      date: "2026-03-15",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      date: "2026-03-18",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      date: "2026-03-18",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      date: "2026-03-18",
      startTime: "14:00",
      endTime: "15:00",
    },
  ],
};
export default function ReservationTestPage() {
  return (
    <main className="min-h-screen p-10">
      <div className="w-fit">
        <Calendar size="lg" />
      </div>
    </main>
  );
}
