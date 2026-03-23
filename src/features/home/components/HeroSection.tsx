import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex w-full justify-center">
      <div className="relative mt-10 h-[180px] w-[327px] overflow-hidden rounded-xl sm:h-[375px] sm:w-[700px] md:h-[400px] md:w-[1120px]">
        <Image
          src="/images/photos/street_dance.svg"
          alt="mainbanner"
          fill
          className="object-cover"
        />

        <div className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2 text-center text-lg font-bold text-white sm:text-2xl md:text-4xl">
          함께 배우면 즐거운 스트릿 댄스
        </div>

        <div className="absolute bottom-[40px] left-1/2 z-10 -translate-x-1/2 text-center text-xs font-medium text-white sm:text-sm md:text-lg">
          1월의 인기 체험 BEST
        </div>
      </div>
    </div>
  );
}
