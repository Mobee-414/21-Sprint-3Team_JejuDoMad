"use client";

import { useEffect } from "react";

export default function KakaoMap() {
  useEffect(() => {
    console.log("카카오 키:", process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log("스크립트 로드 완료");
      window.kakao.maps.load(() => {
        console.log("카카오맵 초기화 완료");
        const container = document.getElementById("map");
        if (!container) {
          console.log("map 컨테이너 없음");
          return;
        }

        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

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
