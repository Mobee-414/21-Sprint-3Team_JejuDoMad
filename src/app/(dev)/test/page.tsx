import { StateBadge } from "@/components/ui/badge/StateBadge";
import { EventBadge } from "@/components/ui/badge/EventBadge";

export default function TestPage() {
  return (
    <main>
      <div className="flex gap-4">
        <StateBadge variant="cancel">예약 취소</StateBadge>
        <StateBadge variant="complete">예약 완료</StateBadge>
        <StateBadge variant="reject">예약 거절</StateBadge>
        <StateBadge variant="experience">체험 완료</StateBadge>
        <StateBadge variant="approve">예약 승인</StateBadge>
      </div>
      <div>
        <EventBadge type="reservation" count={3} />
        <EventBadge type="approved" count={5} />
        <EventBadge type="completed" count={2} />
      </div>
    </main>
  );
}
