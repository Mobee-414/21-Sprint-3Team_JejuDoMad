"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function EmptyState({
  message,
  buttonText,
  onButtonClick,
  imageSrc = "/images/icons/emptyImage.svg",
  imageAlt = "빈 상태 이미지",
  className = "",
}: EmptyStateProps) {
  const showButton = buttonText && onButtonClick;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image src={imageSrc} alt={imageAlt} width={140} height={140} />
      <p className="mt-4 text-center text-18-m text-gray-600">{message}</p>

      {showButton ? (
        <Button
          type="button"
          size="lg"
          onClick={onButtonClick}
          className="mt-6 min-w-[120px]"
        >
          {buttonText}
        </Button>
      ) : null}
    </div>
  );
}
