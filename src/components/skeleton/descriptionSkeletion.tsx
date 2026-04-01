import { Skeleton } from "@/components/ui/skeleton";

export function DescriptionSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <Skeleton className="h-4 w-4/6 rounded" />
    </div>
  );
}
