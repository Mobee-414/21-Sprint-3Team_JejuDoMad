import { ActivityForm } from "@/features/myExperiences/components/activityForm";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-950">내 체험 등록</h3>
      </div>
      <ActivityForm mode="register" />
    </div>
  );
}
