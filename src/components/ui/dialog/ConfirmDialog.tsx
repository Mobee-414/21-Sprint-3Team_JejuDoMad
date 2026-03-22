"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  confirmText = "네",
  cancelText = "아니오",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="flex w-[320px] flex-col items-center gap-[16px] rounded-[24px] px-[30px] pt-[30px] pb-[24px] md:h-[242px] md:w-[400px] md:gap-[24px] md:rounded-[30px]">
        <div className="relative h-[49px] w-[49px] md:h-[88px] md:w-[88px]">
          <Image
            src="/images/icons/modal/visual_warning.svg"
            alt="경고 아이콘"
            fill
            className="object-cover"
          />
        </div>

        <DialogTitle className="text-center text-[16px] font-bold text-gray-950 md:text-[18px]">
          {title}
        </DialogTitle>

        <DialogFooter className="flex w-full flex-row justify-center p-0">
          <div className="flex w-[282px] gap-[12px]">
            <Button
              variant="outline"
              onClick={onCancel}
              className="h-[41px] flex-1 rounded-[12px] md:h-[47px] md:rounded-[14px]"
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className="h-[41px] flex-1 rounded-[12px] md:h-[47px] md:rounded-[14px]"
            >
              {confirmText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
