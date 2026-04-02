import { Skeleton } from "../ui/skeleton";

export function TitleSectionSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-5 w-1/3 rounded" />
      <Skeleton className="h-6 w-3/4 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
    </div>
  );
}
