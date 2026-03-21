"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[8px] border border-transparent bg-clip-padding text-[14px] font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:h-[16px] [&_svg:not([class*='size-'])]:w-[16px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-[4px] hover:underline",
      },
      size: {
        default:
          "h-[32px] gap-[6px] px-[10px] has-data-[icon=inline-end]:pr-[8px] has-data-[icon=inline-start]:pl-[8px]",
        xs: "h-[24px] gap-[4px] rounded-[min(var(--radius-md),10px)] px-[8px] text-[12px] in-data-[slot=button-group]:rounded-[8px] has-data-[icon=inline-end]:pr-[6px] has-data-[icon=inline-start]:pl-[6px] [&_svg:not([class*='size-'])]:h-[12px] [&_svg:not([class*='size-'])]:w-[12px]",
        sm: "h-[28px] gap-[4px] rounded-[min(var(--radius-md),12px)] px-[10px] text-[12.8px] in-data-[slot=button-group]:rounded-[8px] has-data-[icon=inline-end]:pr-[6px] has-data-[icon=inline-start]:pl-[6px] [&_svg:not([class*='size-'])]:h-[14px] [&_svg:not([class*='size-'])]:w-[14px]",
        lg: cn(
          "h-[48px] gap-[8px] px-[24px] text-16-b rounded-[12px]",
          "has-data-[icon=inline-start]:pl-[16px]",
          "has-data-[icon=inline-end]:pr-[16px]",
        ),
        icon: "h-[32px] w-[32px]",
        "icon-xs":
          "h-[24px] w-[24px] rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-[8px] [&_svg:not([class*='size-'])]:h-[12px] [&_svg:not([class*='size-'])]:w-[12px]",
        "icon-sm":
          "h-[28px] w-[28px] rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-[8px]",
        "icon-lg": "h-[36px] w-[36px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    Omit<ButtonPrimitive.Props, "size">,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
