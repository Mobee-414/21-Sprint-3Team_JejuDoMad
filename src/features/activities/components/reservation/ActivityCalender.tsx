"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function ActivityCalendar() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="rounded-2xl border p-4">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </div>
  );
}
