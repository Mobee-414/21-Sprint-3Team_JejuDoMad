"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactPortal, PropsWithChildren, SetStateAction } from "react";
import type {
  DialogContextValue,
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogIconProps,
} from "./types";

const DialogContext = createContext<DialogContextValue | null>(null);

const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("Dialog 컴포넌트 내부에서만 사용");
  }
  return ctx;
};

const useDialogControl = () => {
  const [open, setOpen] = useState(false);
  return { open, onOpenChange: setOpen }; 
};

function Dialog({ children, open: controlledOpen, onOpenChange }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const handleOpenChange = useCallback((value: SetStateAction<boolean>) => {
    const nextOpen = typeof value === "function" ? value(isOpen) : value;

    if (isControlled) {
      onOpenChange?.(nextOpen);
    } else {
      setUncontrolledOpen(nextOpen);
    }
  }, [isControlled, isOpen, onOpenChange]);

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, onClick }: DialogTriggerProps) {
  const { setOpen } = useDialog();
  return (
    <div 
      onClick={() => {
        onClick?.();
        setOpen(true);
      }} 
      className="w-fit inline-block cursor-pointer"
    >
      {children}
    </div>
  );
}

function DialogPortal({ children }: PropsWithChildren): ReactPortal | null {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
}

function DialogClose({ children, className }: DialogContentProps) {
  const { setOpen } = useDialog();
  return (
    <Button 
      type="button" 
      variant="ghost" 
      className={cn("h-auto p-0 hover:bg-transparent", className)} 
      onClick={() => setOpen(false)}
    >
      {children}
    </Button>
  );
}

function DialogOverlay() {
  const { setOpen } = useDialog();
  return <div className="fixed inset-0 isolate z-50 bg-black/50" onClick={() => setOpen(false)} />;
}

function DialogContent({ children, className, showOverlay = true }: DialogContentProps) {
  const { open } = useDialog();
  if (!open) return null;

  return (
    <DialogPortal>
      {showOverlay && <DialogOverlay />}
      <div
        className={cn(
          "fixed z-50 bg-white shadow-lg flex flex-col transition-all",
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", 
          "w-[calc(100%-40px)] max-w-[327px] rounded-xl max-h-(--spacing-modal-max)",
          "md:max-w-md md:rounded-2xl md:max-h-(--spacing-modal-desktop-max)",
          
          className
        )}
      >
        {children}
      </div>
    </DialogPortal>
  );
}

function DialogIcon({ src, alt = "dialog-icon", size, className }: DialogIconProps) {
  return (
    <div className="flex justify-center w-full pt-10">
      <div 
        className={cn(
          "relative",
          !size && className 
        )}
        style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          priority 
          className="object-contain" 
        />
      </div>
    </div>
  );
}

function DialogHeader({ children, className }: DialogContentProps) {
  return <div className={cn("flex flex-col gap-2 p-4", className)}>{children}</div>;
}

function DialogBody({ children, className }: DialogContentProps) {
  return <div className={cn("flex-1 overflow-y-auto p-4", className)}>{children}</div>;
}

function DialogFooter({ children, className }: DialogContentProps) {
  return <div className={cn("flex flex-col gap-2 p-4", className)}>{children}</div>;
}

function DialogTitle({ children, className }: DialogContentProps) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

function DialogDescription({ children, className }: DialogContentProps) {
  return <p className={cn("text-sm text-gray-600", className)}>{children}</p>;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogBody,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogIcon,
  useDialogControl as useDialogState,
};