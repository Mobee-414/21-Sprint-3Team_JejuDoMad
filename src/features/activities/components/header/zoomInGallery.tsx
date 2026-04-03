"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Left from "@/../public/images/buttons/btn_left.svg";
import Right from "@/../public/images/buttons/btn_right.svg";
import Close from "@/../public/images/icons/icon_close.svg";

interface Props {
  images: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ZoomInGallery({
  images,
  index,
  setIndex,
  isOpen,
  setIsOpen,
}: Props) {
  if (!isOpen) return null;

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-opacity-80 fixed inset-0 z-90 flex items-center justify-center bg-gray-700">
      <button onClick={prevImage} className="cursor-pointer">
        <Image src={Left} alt="이전" width={80} height={80} />
      </button>
      <div className="relative flex h-[80vh] w-[80vw] flex-shrink-0 flex-grow-0 items-center justify-center">
        <Image
          src={images[index]}
          alt={`이미지 ${index}`}
          fill
          className="object-contain"
        />
      </div>
      <button onClick={nextImage} className="cursor-pointer">
        <Image src={Right} alt="다음" width={80} height={80} />
      </button>
      <button onClick={() => setIsOpen(false)}>
        <div className="absolute top-5 right-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-50">
          <Image src={Close} alt="닫기" width={20} height={20} />
        </div>
      </button>
    </div>
  );
}
