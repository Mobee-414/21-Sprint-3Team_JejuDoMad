"use client";

import { useEffect } from "react";

type Props = {
  address: string;
};

type GeocoderResult = {
  x: string;
  y: string;
};

type GeocoderStatus = string;

export default function KakaoMap({ address }: Props) {
  useEffect(() => {
    const initMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          address,
          (result: GeocoderResult[], status: GeocoderStatus) => {
            if (status !== window.kakao.maps.services.Status.OK) return;

            const position = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );

            const map = new window.kakao.maps.Map(container, {
              center: position,
              level: 3,
              scrollwheel: false,
            });

            const marker = new window.kakao.maps.Marker({ position });
            marker.setMap(map);

            window.kakao.maps.event.addListener(map, "mouseover", () => {
              map.setZoomable(true);
            });

            window.kakao.maps.event.addListener(map, "mouseout", () => {
              map.setZoomable(false);
            });
          },
        );
      });
    };

    if (window.kakao?.maps) {
      initMap();
      return;
    }

    const existing = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existing) {
      existing.addEventListener("load", initMap);
      return () => existing.removeEventListener("load", initMap);
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = initMap;
    script.onerror = () => console.log("스크립트 로드 실패");

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  return <div id="map" className="mt-4 h-[450px] w-full rounded-2xl" />;
}
