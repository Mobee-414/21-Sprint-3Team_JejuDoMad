import ActivityDetail from "@/features/activities/components/ActivityDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ActivitiyDetailPage({ params }: Props) {
  const { id } = await params;
  return <ActivityDetail activityId={Number(id)} />;
}
