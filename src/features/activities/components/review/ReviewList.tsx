import Image from "next/image";
import { ReviewItem } from "../../schemas/activity.schema";

type Props = {
  reviews: ReviewItem[];
};

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return <p className="text-sm text-gray-500">아직 후기가 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-2xl border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            {review.user.profileImageUrl ? (
              <Image
                src={review.user.profileImageUrl}
                alt={review.user.nickname}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="h-[40px] w-[40px] rounded-full bg-gray-200" />
            )}
            <div>
              <span className="font-medium">{review.user.nickname}</span>
              <span className="ml-2 text-sm text-gray-400">
                {new Date(review.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
              <Image
                key={i}
                src="/images/icons/icon_star_on.svg"
                alt="별점"
                width={14}
                height={14}
              />
            ))}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            {review.content}
          </p>
        </div>
      ))}
    </div>
  );
}
