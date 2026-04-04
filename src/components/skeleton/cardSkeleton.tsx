import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("block w-[155px] max-w-[260px] overflow-hidden rounded-[18px] md:w-[260px] md:rounded-[32px]", className)}>
      <Skeleton className="aspect-[155/175] w-full rounded-none md:aspect-[260/290]" />

      <div className="relative -mt-[34px] rounded-[18px] bg-white px-[17px] py-[16px] shadow-[0px_-4.5px_11.25px_rgba(0,0,0,0.05)] md:rounded-[32px] md:px-[30px] md:py-[20px]">
        <Skeleton className="h-[14px] w-4/5 md:h-[18px]" />

        <div className="mt-[4px] flex items-center gap-[4px] md:mt-[2px]">
          <Skeleton className="h-[16px] w-[16px] rounded-full md:h-[20px] md:w-[20px]" />
          <Skeleton className="h-[12px] w-[60px] md:h-[14px] md:w-[80px]" />
        </div>

        <div className="mt-[10px] md:mt-[18px]">
          <Skeleton className="h-[15px] w-[70px] md:h-[18px] md:w-[90px]" />
        </div>
      </div>
    </div>
  );
}
