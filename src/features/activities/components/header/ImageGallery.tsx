import Image from "next/image";

type Props = {
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
};

export default function ImageGallery({ bannerImageUrl, subImages }: Props) {
  return (
    <div className="relative aspect-[327/245] w-full max-w-[327px] overflow-hidden rounded-2xl bg-gray-100 sm:aspect-[684/400] sm:max-w-[684px] md:max-w-full">
      <Image
        src={bannerImageUrl}
        alt="배너 그림"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
}
