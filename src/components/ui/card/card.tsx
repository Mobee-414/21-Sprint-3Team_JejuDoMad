import { CardProps } from "./types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Card({
  id,
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
  className,
}: CardProps) {
  return (
    <Link
      href={`/activities/${id}`}
      className={cn(
        "block w-[155px] max-w-[260px] overflow-hidden rounded-[18px] md:w-[260px] md:rounded-[32px]",
        className,
      )}
    >
      <div className="relative aspect-[155/175] w-full md:aspect-[260/290]">
        <Image
          src={bannerImageUrl}
          fill
          alt={`${title}의 배너이미지`}
          className="object-cover"
        />
      </div>
      <div className="relative -mt-[34px] rounded-[18px] bg-white px-[17px] py-[16px] shadow-[0px_-4.5px_11.25px_rgba(0,0,0,0.05)] md:rounded-[32px] md:px-[30px] md:py-[20px]">
        <h4 className="overflow-hidden text-[14px] font-bold text-ellipsis whitespace-nowrap md:text-[18px] md:leading-[26px]">
          {title}
        </h4>
        <div className="mt-[4px] flex items-center text-[12px] font-medium md:mt-[2px] md:text-[14px]">
          <Image
            src="/images/icons/star.svg"
            width={20}
            height={20}
            alt="별 아이콘"
            className="mr-[3px] h-[16px] w-[16px] md:mr-[5px] md:h-[20px] md:w-[20px]"
          />
          {rating}
          <span className="text-gray-400 md:ml-[2px]">({reviewCount})</span>
        </div>
        <div className="mt-[10px] flex flex-wrap items-center gap-[2px] md:mt-[18px]">
          <strong className="text-[15px] font-bold md:text-[18px]">
            &#8361; {(price ?? 0).toLocaleString()}
          </strong>
          <span className="text-[12px] font-medium text-gray-400 md:text-[16px]">
            / 인
          </span>
        </div>
      </div>
    </Link>
  );
}
