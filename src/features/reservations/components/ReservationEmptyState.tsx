"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ReservationEmptyState() {
  const router = useRouter();

  return (
    <div className="flex h-[287px] w-[182px] flex-col items-center justify-between">
      <div className="flex h-[203px] w-full flex-col items-center justify-center gap-[30px]">
        <Image
          src="/images/icons/emptyImage.svg"
          alt="예약 내역 없음"
          width={122}
          height={122}
        />

        <p className="text-center text-18-m whitespace-nowrap text-gray-600">
          아직 예약한 체험이 없어요
        </p>
      </div>

      <Button
        type="button"
        size="lg"
        onClick={() => router.push("/activities")}
        className="h-[54px] w-full"
      >
        둘러보기
      </Button>
    </div>
  );
}
