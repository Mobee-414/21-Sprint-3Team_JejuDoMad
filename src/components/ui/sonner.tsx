"use client";

import { useTheme } from "next-themes";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "max-w-[270px] w-full rounded-[12px] border border-border bg-card text-card-foreground shadow-sm px-[12px] py-[10px] text-[13px]",
          title: "text-14-b text-foreground",
          description: "text-13-m text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground hover:bg-primary/90 rounded-[8px]",
          cancelButton:
            "bg-muted text-muted-foreground hover:bg-muted/80 rounded-[8px]",
          success: "[&_[data-icon]]:text-primary",
          error: "[&_[data-icon]]:text-destructive",
          warning: "[&_[data-icon]]:text-yellow-500",
          info: "[&_[data-icon]]:text-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
