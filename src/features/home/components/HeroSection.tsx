import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full">
      <div className="relative mx-auto mt-[40px] h-[300px] max-w-[1120px] overflow-hidden rounded-[12px] md:h-[400px]">
        <Image
          src="/images/photos/street_dance.svg"
          alt="mainbanner"
          fill
          className="object-cover"
        />

        <div className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2 text-[24px] font-bold text-white md:text-[36px]">
          함께 배우면 즐거운 스트릿 댄스
        </div>

        <div className="absolute bottom-[40px] left-1/2 z-10 -translate-x-1/2 text-[14px] font-medium text-white md:text-[18px]">
          1월의 인기 체험 BEST
        </div>
      </div>
    </div>
  );
}
