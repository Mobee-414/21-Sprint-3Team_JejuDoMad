"use client";

import { useEffect } from "react";

type Props = {
  address: string;
};

export default function KakaoMap({ address }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) {
          return;
        }

        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 주소 좌표 넣기 수정
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.5665, 126.978),
        });

        marker.setMap(map);
      });
    };

    script.onerror = () => {
      console.log("스크립트 로드 실패");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" className="mt-4 h-[450px] w-full rounded-2xl" />;
}
