import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex w-full justify-center px-6 md:px-10">
      <div className="relative mt-10 flex aspect-[327/181] w-full max-w-[1200px] justify-end overflow-hidden rounded-xl pb-10 md:aspect-[684/375] lg:aspect-[1120/500]">
        <Image
          src="/images/photos/street_dance.svg"
          alt="mainbanner"
          fill
          className="object-cover"
        />

        <div className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2 text-center text-lg font-bold break-keep text-white sm:text-2xl md:text-4xl">
          함께 배우면 즐거운 스트릿 댄스
        </div>

        <div className="absolute bottom-[40px] left-1/2 z-10 -translate-x-1/2 text-center text-xs font-medium text-white sm:text-sm md:text-lg">
          4월의 인기 체험 BEST
        </div>
      </div>
    </div>
  );
}
