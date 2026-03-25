"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FieldErrors } from "react-hook-form";
import { type ActivityFormType } from "@/features/myActivities/types/schema";

interface ImageUploaderProps {
  bannerValue: string | null;
  subImagesValue: string[];
  onBannerChange: (url: string) => void;
  onSubImagesChange: (urls: string[]) => void;
  errors: FieldErrors<ActivityFormType>;
}

export const ImageUploader = ({
  bannerValue,
  subImagesValue,
  onBannerChange,
  onSubImagesChange,
  errors,
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
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[10px]">
        <label className="text-[16px] font-medium text-gray-950">
          배너 이미지
        </label>
        <div
          onClick={() => bannerInputRef.current?.click()}
          className={cn(
            "relative flex h-[160px] w-[160px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[8px] border-[2px] border-gray-100 bg-white shadow-[0_2px_6px_0_#00000005] transition-all hover:border-black",
            errors.bannerImageUrl && "border-red-500",
          )}
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
              <span className="text-[24px] text-gray-400">+</span>
              <span className="mt-[4px] text-[12px] text-gray-400">
                이미지 등록
              </span>
            </>
          )}
        </div>
        {errors.bannerImageUrl && (
          <p className="px-2 text-[14px] text-red-500">
            {errors.bannerImageUrl.message}
          </p>
        )}
        <input
          type="file"
          ref={bannerInputRef}
          onChange={handleBannerChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-between">
          <label className="text-[16px] font-medium text-gray-950">
            소개 이미지
          </label>
          <span className="text-[14px] text-gray-400">
            ({subImagesValue.length}/4)
          </span>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          {subImagesValue.length < 4 && (
            <div
              onClick={() => subInputRef.current?.click()}
              className="flex h-[160px] w-[160px] cursor-pointer flex-col items-center justify-center rounded-[8px] border border-[2px] border-gray-100 bg-white shadow-[0_2px_6px_0_#00000005] transition-all hover:border-black"
            >
              <span className="text-[24px] text-gray-400">+</span>
              <span className="mt-[4px] text-[12px] text-gray-400">
                이미지 추가
              </span>
            </div>
          )}

          {subImagesValue.map((src, index) => (
            <div key={index} className="relative h-[160px] w-[160px]">
              <Image
                src={src}
                alt={`소개-${index}`}
                fill
                unoptimized
                className="rounded-[8px] border border-gray-100 object-cover"
              />
              <button
                type="button"
                onClick={() => handleDeleteSubImage(index)}
                className="absolute -top-[8px] -right-[8px] z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-black/80 text-[20px] text-white shadow-md hover:bg-black"
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
