import { CardProps } from "./types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Card({
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
  className,
}: CardProps) {
  return (
    <Link
      href={``}
      className={cn(
        "block w-38.75 max-w-65 overflow-hidden rounded-[18px] md:w-65 md:rounded-4xl",
        className,
      )}
    >
      <div className="relative aspect-155/175 w-full md:aspect-260/290">
        <Image
          src={bannerImageUrl}
          fill
          alt={`${title}의 배너이미지`}
          className="object-cover"
        />
      </div>
      <div className="relative -mt-8.5 rounded-[18px] bg-white px-4.25 py-4 shadow-[0px_-4.5px_11.25px_rgba(0,0,0,0.05)] md:rounded-4xl md:px-7.5 md:py-5">
        <h4 className="text-14 md:text-18 overflow-hidden font-bold text-ellipsis whitespace-nowrap md:leading-6.5">
          {title}
        </h4>
        <div className="text-12 md:text-14 mt-1 flex items-center font-medium md:mt-0.5">
          <Image
            src="/images/icons/star.svg"
            width={20}
            height={20}
            alt="별 아이콘"
            className="mr-0.75 h-4 w-4 md:mr-1.25 md:h-5 md:w-5"
          />
          {rating}
          <span className="text-gray-400 md:ml-0.5">({reviewCount})</span>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-0.5 md:mt-4.5">
          <strong className="md:text-18 text-[15px] font-bold">
            &#8361; {(price ?? 0).toLocaleString()}
          </strong>
          <span className="text-12 md:text-16 font-medium text-gray-400">
            / 인
          </span>
        </div>
      </div>
    </Link>
  );
}
