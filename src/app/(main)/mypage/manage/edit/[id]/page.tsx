"use client";

import { useParams, useRouter } from "next/navigation";
// import { useGetActivityDetail } from "@/features/myActivities/hooks/useGetActivityDetail";
import { useUpdateMyActivity } from "@/features/myActivities/hooks/useUpdateMyActivity";
import { ActivityRequest } from "@/features/myActivities/types/schema";

// 체험상세페이지랑 추후 연동필요

export default function EditActivityPage() {
  const params = useParams();
  const router = useRouter();
  const activityId = Number(params.id);

  // const { data: activity, isLoading, isError } = useGetActivityDetail(activityId);

  //  임시 변수 설정
  const isLoading = false;
  const isError = false;
  const activity = { title: "불러올 체험 제목" };

  const { mutate: updateActivity, isPending: isUpdating } =
    useUpdateMyActivity(activityId);

  const handleSubmit = (formData: ActivityRequest) => {
    updateActivity(formData, {
      onSuccess: () => {
        router.push("/mypage/activities");
      },
    });
  };

  if (isLoading)
    return (
      <div className="py-20 text-center">기존 정보를 불러오는 중입니다...</div>
    );

  if (isError || !activity)
    return (
      <div className="py-20 text-center text-red-500">
        데이터를 가져오는데 실패했습니다.
      </div>
    );

  return (
    <div className="mx-auto max-w-[800px] p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">내 체험 수정</h1>
      </header>

      <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center">
        <p className="text-gray-500">
          <strong>initialData</strong>로 <strong>{activity.title}</strong>{" "}
        </p>

        {/* <ActivityForm 
          initialData={activity} 
          onSubmit={handleSubmit} 
          isSubmitting={isUpdating} 
        /> 
        */}
      </div>
    </div>
  );
}
