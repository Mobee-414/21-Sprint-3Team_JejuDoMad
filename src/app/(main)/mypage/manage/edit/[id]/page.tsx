"use client";

import { useParams } from "next/navigation";
import { ActivityForm } from "@/features/myActivities/components/form/activityForm";
import { useActivityDetail } from "@/features/activities/hooks/useActivityDetail";

export default function EditActivityPage() {
  const params = useParams();
  const activityId = Number(params.id);

  const { data: activity, isLoading, isError } = useActivityDetail(activityId);

  if (isLoading) {
    return (
      <div className="py-20 text-center font-medium text-gray-500">
        기존 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (isError || !activity) {
    return (
      <div className="py-20 text-center font-medium text-red-500">
        데이터를 가져오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[800px] p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">내 체험 수정</h1>
      </header>

      <ActivityForm mode="edit" initialData={activity} />
    </div>
  );
}
