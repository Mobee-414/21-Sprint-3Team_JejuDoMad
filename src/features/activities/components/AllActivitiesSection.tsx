import Card from "@/components/ui/card/card";
import CategoryFilter from "./CategoryFilter";
import PriceSortDropdown from "./PriceSortDropdown";
import Pagination from "./Pagination";

export default function AllActivitiesSection() {
  return (
    <div className="mx-auto mt-20 max-w-280">
      <h2 className="text-xl font-bold"> 모든 체험</h2>

      <div className="mt-6 flex items-center justify-between">
        <CategoryFilter />
        <PriceSortDropdown />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
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
      <div className="mt-10 mb-50">
        <Pagination />
      </div>
    </div>
  );
}
