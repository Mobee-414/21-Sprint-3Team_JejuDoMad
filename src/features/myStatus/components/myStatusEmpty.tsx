"use client";

import Image from "next/image";

export default function MyStatusEmpty() {
  return (
    <div className="flex w-full flex-col items-center justify-center py-20">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          src="/images/icons/emptyImage.svg"
          alt="등록된 체험 없음"
          width={122}
          height={122}
        />
        <p className="text-center text-18-m text-muted-foreground">
          아직 등록한 체험이 없어요
        </p>
      </div>
    </div>
  );
}
