import { StateBadge } from "@/components/ui/badge/StateBadge";

type EventBadgeType = "reservation" | "approved" | "completed";

interface EventBadgeProps {
  type: EventBadgeType;
  count: number;
}

const eventBadgeText: Record<EventBadgeType, string> = {
  reservation: "예약",
  approved: "승인",
  completed: "완료",
};

const eventBadgeVariant: Record<
  EventBadgeType,
  "experience" | "approve" | "cancel"
> = {
  reservation: "experience",
  approved: "approve",
  completed: "cancel",
};

export function EventBadge({ type, count }: EventBadgeProps) {
  return (
    <StateBadge variant={eventBadgeVariant[type]}>
      {eventBadgeText[type]} {count}
    </StateBadge>
  );
}
