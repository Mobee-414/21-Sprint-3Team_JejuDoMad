import Image from "next/image"

export default function HeroSection () {
  return (
    <div className="w-full">
      {/* 메인 배너 */}
      <div className="relative mt-10 h-[300px] md:h-[400px] max-w-[1120px] mx-auto rounded-xl overflow-hidden">
        <Image 
          src="/images/photos/street_dance.svg"
          alt="mainbanner"
          fill
          className="object-cover"
        />
        {/* 문구 */}
        <div className="absolute z-10 left-1/2 bottom-20 -translate-x-1/2 text-white text-2xl md:text-4xl font-bold">
          함께 배우면 즐거운 스트릿 댄스
        </div>
        <div className="absolute z-10 left-1/2 bottom-10 -translate-x-1/2 text-white text-sm md:text-lg font-medium">
          1월의 인기 체험 BEST
        </div>
      </div>
      
    </div>
  )
}