"use client";

import type { SetStateAction } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button";

interface ReservationSuccessDialogProps {
  open: boolean;
  onOpenChange: (value: SetStateAction<boolean>) => void;
}

export default function ReservationSuccessDialog({
  open,
  onOpenChange,
}: ReservationSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[320px] rounded-[24px] bg-card px-[30px] pt-[34px] pb-[30px] md:w-[400px] md:rounded-[30px] md:px-[40px] md:pt-[40px] md:pb-[30px]">
        <div className="flex flex-col items-center gap-[16px] md:gap-[20px]">
          <p className="text-16-b text-foreground md:text-18-b">
            예약이 완료되었습니다.
          </p>

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-[41px] w-[180px] rounded-[12px] text-14-b text-primary-foreground md:h-[47px] md:w-[200px] md:rounded-[14px] md:text-16-b"
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
