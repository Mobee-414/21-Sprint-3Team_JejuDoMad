"use client";

import { useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  bannerValue: string | null;
  subImagesValue: string[];
  onBannerChange: (url: string) => void;
  onSubImagesChange: (urls: string[]) => void;
}

export const ImageUploader = ({
  bannerValue,
  subImagesValue,
  onBannerChange,
  onSubImagesChange,
}: ImageUploaderProps) => {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const subInputRef = useRef<HTMLInputElement>(null);
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onBannerChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 4 - subImagesValue.length;
    const targetFiles = files.slice(0, remaining);

    targetFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSubImagesChange([...subImagesValue, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteSubImage = (index: number) => {
    onSubImagesChange(subImagesValue.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <label className="text-base font-medium text-gray-950">
          배너 이미지
        </label>
        <div
          onClick={() => bannerInputRef.current?.click()}
          className="relative flex h-40 w-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-2 border-gray-100 bg-white shadow-[0_2px_6px_0_#00000005] transition-all hover:border-black"
        >
          {bannerValue ? (
            <Image
              src={bannerValue}
              alt="배너"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <>
              <span className="text-2xl text-gray-400">+</span>
              <span className="mt-1 text-xs text-gray-400">이미지 등록</span>
            </>
          )}
        </div>
        <input
          type="file"
          ref={bannerInputRef}
          onChange={handleBannerChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-950">
            소개 이미지
          </label>
          <span className="text-sm text-gray-400">
            ({subImagesValue.length}/4)
          </span>
        </div>
        <div className="flex flex-wrap gap-4">
          {subImagesValue.length < 4 && (
            <div
              onClick={() => subInputRef.current?.click()}
              className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-2 border-gray-100 bg-white shadow-[0_2px_6px_0_#00000005] transition-all hover:border-black"
            >
              <span className="text-2xl text-gray-400">+</span>
              <span className="mt-1 text-xs text-gray-400">이미지 추가</span>
            </div>
          )}

          {subImagesValue.map((src, index) => (
            <div key={index} className="relative h-40 w-40">
              <Image
                src={src}
                alt={`소개-${index}`}
                fill
                unoptimized
                className="rounded-lg border border-gray-100 object-cover"
              />
              <button
                type="button"
                onClick={() => handleDeleteSubImage(index)}
                className="absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-xl text-white shadow-md hover:bg-black"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          ref={subInputRef}
          onChange={handleSubImagesChange}
          multiple
          className="hidden"
          accept="image/*"
        />
      </div>
    </div>
  );
};
