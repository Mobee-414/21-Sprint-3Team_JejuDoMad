import Card from "@/components/ui/card/card";
import CategoryFilter from "./CategoryFilter";
import PriceSortDropdown from "./PriceSortDropdown";
import Pagination from "./Pagination";

export default function AllActivitiesSection() {
  return (
    <div className="mx-auto mt-[80px] max-w-[1120px]">
      <h2 className="text-[20px] font-bold"> 모든 체험</h2>

      <div className="mt-[24px] flex items-center justify-between">
        <CategoryFilter />
        <PriceSortDropdown />
      </div>

      <div className="mt-[24px] grid grid-cols-2 gap-[16px] md:grid-cols-4">
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

      <div className="mt-[40px] mb-[200px]">
        <Pagination />
      </div>
    </div>
  );
}
