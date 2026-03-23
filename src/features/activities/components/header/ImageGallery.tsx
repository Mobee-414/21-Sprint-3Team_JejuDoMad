import Image from "next/image";

export default function ImageGallery() {
  return (
    <div className="relative aspect-[327/245] w-full max-w-[327px] overflow-hidden rounded-2xl sm:aspect-[684/400] sm:max-w-[684px] md:max-w-full">
      <Image
        src="/images/photos/street_dance.svg"
        alt="배너 그림"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
