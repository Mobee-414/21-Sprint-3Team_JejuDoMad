import type { ReservationStatus } from "../types/reservation.schema";
import type { StateBadgeProps } from "@/components/ui/badge/StateBadge";

export const reservationStatusMap: Record<
  ReservationStatus,
  { label: string; variant: StateBadgeProps["variant"] }
> = {
  pending: {
    label: "예약 완료",
    variant: "complete",
  },
  confirmed: {
    label: "예약 승인",
    variant: "approve",
  },
  declined: {
    label: "예약 거절",
    variant: "reject",
  },
  canceled: {
    label: "예약 취소",
    variant: "cancel",
  },
  completed: {
    label: "체험 완료",
    variant: "experience",
  },
} as const;
