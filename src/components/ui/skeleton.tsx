import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md",
        "animate-[shimmer_1.6s_ease-in-out_infinite]",
        "animate-shimmer bg-[length:800px_100%]",
        "[background-image:linear-gradient(90deg,#eeeeee_25%,#cccccc_50%,#eeeeee_75%)]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
