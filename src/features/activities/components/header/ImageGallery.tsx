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

  return (
    <>
      <section className="flex gap-1.5">
        <div
          className="relative h-[246px] w-1/2 cursor-pointer md:h-[400px]"
          onClick={() => {
            setIndex(0);
            setIsOpen(true);
          }}
        >
          <Image
            src={bannerImageUrl}
            alt="배너 그림"
            fill
            className="rounded-tl-3xl rounded-bl-3xl object-cover object-center"
            sizes="(max-width: 744px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex w-1/2 flex-col gap-1.5">
          {subImages.map((img, idx) => {
            if (idx >= 2) return null;

            return (
              <div
                key={img.id}
                className="relative h-30 w-full cursor-pointer md:h-[197px]"
                onClick={() => {
                  setIndex(idx + 1);
                  setIsOpen(true);
                }}
              >
                <Image
                  src={img.imageUrl}
                  alt={`서브 이미지 ${idx}`}
                  fill
                  className={`object-cover object-center ${
                    idx === 0
                      ? "rounded-tr-3xl"
                      : idx === 1
                        ? "rounded-br-3xl"
                        : ""
                  }`}
                  sizes="(max-width: 744px) 100vw, 50vw"
                />
              </div>
            );
          })}
        </div>

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
