"use client";

import Image from "next/image";
import { useState } from "react";
import ZoomInGallery from "./zoomInGallery";

type Props = {
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
};

export default function ImageGallery({ bannerImageUrl, subImages }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [bannerImageUrl, ...subImages.map((img) => img.imageUrl)];

  const subCount = subImages.length;

  return (
    <>
      <section className="flex gap-1.5">
        {/* 배너 이미지 */}
        <div
          className={`relative h-[246px] cursor-pointer md:h-[400px] ${subCount === 0 ? "w-full rounded-3xl" : "w-1/2"}`}
          onClick={() => {
            setIndex(0);
            setIsOpen(true);
          }}
        >
          <Image
            src={bannerImageUrl}
            alt="배너 그림"
            fill
            className={`object-cover object-center ${
              subCount === 0 ? "rounded-3xl" : "rounded-tl-3xl rounded-bl-3xl"
            }`}
            sizes="(max-width: 744px) 100vw, 50vw"
            priority
          />
        </div>

        {/* 서브 이미지 */}
        {subCount > 0 && (
          <div className="flex w-1/2 flex-col gap-1.5">
            {subImages.map((img, idx) => {
              if (idx >= 2) return null;

              const isOnlyOne = subCount === 1;
              const roundedClass = isOnlyOne
                ? "rounded-tr-3xl rounded-br-3xl"
                : idx === 0
                  ? "rounded-tr-3xl"
                  : "rounded-br-3xl";

              return (
                <div
                  key={img.id}
                  className={`relative w-full cursor-pointer ${isOnlyOne ? "h-full md:h-[400px]" : "h-30 md:h-[197px]"}`}
                  onClick={() => {
                    setIndex(idx + 1);
                    setIsOpen(true);
                  }}
                >
                  <Image
                    src={img.imageUrl}
                    alt={`서브 이미지 ${idx}`}
                    fill
                    className={`object-cover object-center ${roundedClass}`}
                    sizes="(max-width: 744px) 100vw, 50vw"
                  />
                </div>
              );
            })}
          </div>
        )}

        <ZoomInGallery
          images={images}
          index={index}
          setIndex={setIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </section>
    </>
  );
}
