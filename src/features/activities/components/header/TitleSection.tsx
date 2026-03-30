import Image from "next/image";
import KebabMenu from "./KebabMenu";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
  activityId?: number;
};

export default function TitleSection({
  title,
  category,
  rating,
  reviewCount,
  address,
  onEdit,
  onDelete,
  isOwner,
  activityId,
}: Props) {
  const router = useRouter();

  return (
    <div className="mt-6 flex w-full items-start gap-2 md:mt-0">
      <div className="flex flex-1 flex-col gap-5">
        <div>
          <p className="text-sm text-gray-500">{category}</p>
          <h1 className="text-xl font-bold md:text-2xl">{title}</h1>

          <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
            <Image
              src="/images/icons/icon_star_on.svg"
              alt="별점"
              width={16}
              height={16}
            />
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
        </div>

        <div className="text-sm text-gray-700">
          <p>{address}</p>
        </div>
      </div>

      {isOwner && (
        <KebabMenu
          onEdit={
            onEdit || (() => router.push(`/mypage/manage/edit/${activityId}`))
          }
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
