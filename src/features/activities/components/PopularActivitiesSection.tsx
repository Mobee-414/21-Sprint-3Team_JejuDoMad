import Card from '@/components/ui/card/card';

export default function PopularActivitiesSection () {
  return (
    <div className="max-w-[1120px] mx-auto mt-20">
      <h2 className="text-xl font-bold"> 인기 체험</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Card 
          bannerImageUrl="/images/photos/street_dance.svg"
          title="함께 배우면 즐거운 스트릿 댄스"
          rating={4.9}
          reviewCount={703}
          price={38000}
        />
        <Card 
          bannerImageUrl="/images/photos/stepping_stones.svg"
          title="연인과 사랑의 징검다리"
          rating={3.9}
          reviewCount={108}
          price={35000}
        />
        <Card 
          bannerImageUrl="/images/photos/vr.svg"
          title="VR 게임 마스터 하는 법"
          rating={4.9}
          reviewCount={293}
          price={38000}
        />
        <Card 
          bannerImageUrl="/images/photos/camp.svg"
          title="자연 속에서 캠핑하기"
          rating={4.7}
          reviewCount={236}
          price={45000}
        />
      </div>
    </div>
  )
}