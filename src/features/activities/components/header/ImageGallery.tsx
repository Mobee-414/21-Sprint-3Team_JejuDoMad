import Image from "next/image";

export default function ImageGallery() {
  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-2xl md:h-[400px] md:w-[670px]">
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
