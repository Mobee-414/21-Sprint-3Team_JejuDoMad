"use client";

interface ReservationFormBarProps {
  price: number;
  onOpen: () => void;
}

export default function ReservationFormBar({
  price,
  onOpen,
}: ReservationFormBarProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-[60] border-t border-border bg-background">
      <div className="mx-auto flex h-[72px] w-full max-w-[744px] items-center justify-between px-[20px]">
        <div className="flex items-end gap-[4px]">
          <span className="text-24-b text-foreground">
            ₩ {price.toLocaleString()}
          </span>
          <span className="pb-[2px] text-16-m text-muted-foreground">
            / 1명
          </span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="cursor-pointer text-14-b text-primary underline underline-offset-2"
        >
          날짜 선택하기
        </button>
      </div>

      <div className="mx-auto w-full max-w-[744px] px-[20px] pb-[12px]">
        <button
          type="button"
          onClick={onOpen}
          className="h-[44px] w-full cursor-pointer rounded-[12px] bg-muted text-14-b text-muted-foreground"
        >
          예약하기
        </button>
      </div>
    </div>
  );
}
