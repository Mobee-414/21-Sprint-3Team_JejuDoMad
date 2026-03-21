import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const stateBadgeVariants = cva(
  "inline-flex h-[24px] min-w-fit shrink-0 items-center justify-center rounded-[6px] px-[8px] py-[4px] text-11-m whitespace-nowrap",
  {
    variants: {
      variant: {
        cancel: "bg-[#E0E0E5] text-[#707177]",
        complete: "bg-[#E9FBE4] text-[#2BA90D]",
        reject: "bg-[#FCECEA] text-[#F96767]",
        experience: "bg-[#DAF0FF] text-[#0D6CD1]",
        approve: "bg-[#DDF9F9] text-[#1790A0]",
      },
    },
    defaultVariants: {
      variant: "cancel",
    },
  },
);

export interface StateBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stateBadgeVariants> {}

export function StateBadge({ className, variant, ...props }: StateBadgeProps) {
  return (
    <div
      className={cn(stateBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}
