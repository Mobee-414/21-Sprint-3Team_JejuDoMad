import Image from "next/image";

type Props = {
  averageRating: number;
  totalCount: number;
};

const getRatingLabel = (rating: number) => {
  if (rating >= 4.5) return "매우 만족";
  if (rating >= 4.0) return "만족";
  if (rating >= 3.0) return "보통";
  return "아쉬움";
};

export default function ReviewHeader({ averageRating, totalCount }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold md:text-xl">체험 후기</h2>
        <span className="text-sm text-gray-500">{totalCount}</span>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <span className="mt-2 text-2xl font-bold">
          {averageRating.toFixed(1)}
        </span>
        <span className="mt-1 text-sm text-gray-600">
          {getRatingLabel(averageRating)}
        </span>
        <span className="mt-1 text-sm text-gray-500">{totalCount}개 후기</span>
      </div>
    </div>
  );
}
