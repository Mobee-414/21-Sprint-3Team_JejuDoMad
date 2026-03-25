import { Skeleton } from "@/components/ui/skeleton";

export default function MyActivityCardSkeleton() {
  return (
    <div className="flex w-full flex-row gap-4 rounded-xl border p-4 shadow-sm lg:gap-6">
      <Skeleton className="h-24 w-24 shrink-0 rounded-lg lg:h-32 lg:w-32" />
      <div className="flex flex-1 flex-col gap-3 py-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-3/4" />
        <div className="mt-auto flex justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
