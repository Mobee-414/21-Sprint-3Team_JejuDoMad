import { notFound } from "next/navigation";
import ActivityDetail from "@/features/activities/components/ActivityDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ActivitiyDetailPage({ params }: Props) {
  const { id } = await params;
  const activityId = Number(id);

  if (!id || isNaN(activityId) || activityId <= 0) {
    notFound();
  }

  return <ActivityDetail activityId={activityId} />;
}
