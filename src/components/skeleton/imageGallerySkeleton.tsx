import { Skeleton } from "../ui/skeleton";

export function ImageGallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <Skeleton className="aspect-[16/9] animate-pulse rounded-xl" />
      <div className="hidden gap-2 md:grid">
        <Skeleton className="h-full rounded-xl" />
        <Skeleton className="h-full rounded-xl" />
      </div>
    </div>
  );
}
