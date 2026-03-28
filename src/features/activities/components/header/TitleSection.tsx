import Image from "next/image";
import KebabMenu from "./KebabMenu";

type Props = {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
};

export default function TitleSection({
  title,
  category,
  rating,
  reviewCount,
  address,
}: Props) {
  const isMyActivity = true;

  return (
    <div className="mt-6 flex h-[190px] w-full items-start justify-between md:mt-0">
      <div className="flex h-full flex-col gap-5">
        <div>
          <p className="text-sm text-gray-500">{category}</p>
          <h1 className="text-xl font-bold md:text-2xl">{title}</h1>

          <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
            <Image
              src="/images/icons/star.svg"
              alt="별점"
              width={16}
              height={16}
            />
            <span>{rating}</span>
            <span>({reviewCount})</span>
            <span>서울</span>
          </div>
        </div>

        <div className="text-sm text-gray-700">
          <p>{address}</p>
          <p className="mt-1 line-clamp-2">
            초보자부터 전문가까지 춤추는 즐거움을 함께 느껴보세요
          </p>
        </div>
      </div>

      {isMyActivity && <KebabMenu />}
    </div>
  );
}
