"use client";

import { useEffect } from "react"; // 추가
import SideMenu from "@/components/ui/sideMenu";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isMainMyPage = pathname === "/mypage";

  // ✨ PC 환경에서 /mypage 접속 시 자동으로 /mypage/myInfo로 이동
  useEffect(() => {
    const handleRedirect = () => {
      // 768px(md 기준) 이상이고 현재 경로가 정확히 /mypage일 때
      if (window.innerWidth >= 768 && isMainMyPage) {
        router.replace("/mypage/myInfo");
      }
    };

    handleRedirect();

    // 브라우저 크기가 변할 때도 대응하고 싶다면 리스너 추가 (선택 사항)
    window.addEventListener("resize", handleRedirect);
    return () => window.removeEventListener("resize", handleRedirect);
  }, [isMainMyPage, router]);

  return (
    <div className="mx-auto mt-10 flex w-full max-w-245 flex-col items-center gap-6 px-4 pb-20 md:mt-7.5 md:max-w-186 md:flex-row md:items-start md:gap-7.5 md:px-7.5 md:pb-24 lg:mt-10 lg:max-w-245 lg:gap-7.5 lg:px-10 lg:pb-30">
      {/* 1. 사이드 메뉴 영역 */}
      <div
        className={`w-full max-w-72.5 md:w-40 md:shrink-0 lg:w-72.5 ${isMainMyPage ? "block" : "hidden md:block"} `}
      >
        <SideMenu />
      </div>

      {/* 2. 메인 콘텐츠 영역 */}
      <div
        className={`w-full md:min-w-0 md:flex-1 lg:max-w-160 ${isMainMyPage ? "hidden md:block" : "block"} `}
      >
        {!isMainMyPage && (
          <button
            onClick={() => router.push("/mypage")}
            className="mb-4 flex items-center gap-2 text-16-m text-gray-600 md:hidden"
          >
            <span className="text-xl">←</span> 뒤로가기
          </button>
        )}

        {children}
      </div>
    </div>
  );
}
