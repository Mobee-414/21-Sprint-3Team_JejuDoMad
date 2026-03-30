"use client";

import { useState } from "react";
import ReservationFormMobile from "./ReservationFormMobile";
import ReservationFormTablet from "./ReservationFormTablet";
import ReservationFormDesktop from "./ReservationFormDesktop";
import ReservationFormBar from "./ReservationFormBar";
import type { Schedule } from "../types/reservation.schema";

interface ReservationFormResponsiveProps {
  price: number;
  schedules: Schedule[];
}

export default function ReservationFormResponsive({
  price,
  schedules,
}: ReservationFormResponsiveProps) {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleOpenReservation = () => {
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
  };

  return (
    <>
      <div className="block min-[744px]:hidden">
        {!isReservationOpen && (
          <ReservationFormBar price={price} onOpen={handleOpenReservation} />
        )}

        <ReservationFormMobile
          open={isReservationOpen}
          onClose={handleCloseReservation}
          price={price}
          schedules={schedules}
        />
      </div>

      <div className="hidden min-[744px]:block min-[1024px]:hidden">
        <ReservationFormBar price={price} onOpen={handleOpenReservation} />
        <ReservationFormTablet
          open={isReservationOpen}
          onClose={handleCloseReservation}
          price={price}
          schedules={schedules}
        />
      </div>

      <div className="hidden min-[1024px]:block">
        <ReservationFormDesktop price={price} schedules={schedules} />
      </div>
    </>
  );
}
