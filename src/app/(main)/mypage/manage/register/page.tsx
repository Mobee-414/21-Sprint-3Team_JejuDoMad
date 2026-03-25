import { ActivityForm } from "@/features/myActivities/components/form/activityForm";

export default function Page() {
  return (
    <div className="mx-auto max-w-[896px] px-[16px] py-[48px]">
      <div className="mb-[32px] flex items-center justify-between">
        <h3 className="text-[24px] font-bold text-gray-950">내 체험 등록</h3>
      </div>
      <ActivityForm mode="register" />
    </div>
  );
}
