"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Zustand 스토어
import { Suspense } from "react";
import { useAuthStore } from "@/store/authStore";
import apiClient from "@/shared/api/apiClient";

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  // StrictMode에서 두 번 실행되는 것을 막기 위한 변수
  const isProcessing = useRef(false);

  useEffect(() => {
    // 1. 인가 코드가 없거나 이미 처리 중이면 중단
    if (!code || isProcessing.current) return;

    const loginWithKakao = async () => {
      isProcessing.current = true; // 처리 시작 표시

      try {
        console.log("🚀 카카오 로그인 시도 중... 코드:", code);

        // 2. 명세서에 따른 POST 요청 (provider 자리에 'kakao' 넣기)
        const response = await apiClient.post("oauth/sign-in/kakao", {
          token: code, // 명세서의 "token" 키 사용
          redirectUri: "http://localhost:3000/oauth/kakao", // 명세서 예시와 동일하게 설정
        });

        // 3. 성공 시 데이터 구조에 맞춰 Zustand에 저장
        // response.data 구조는 API 응답에 따라 { user, accessToken } 등일 것입니다.
        const { user, accessToken } = response.data;
        useAuthStore.getState().setAuth(user, accessToken);

        console.log("✅ 로그인 성공!");
        router.replace("/"); // 메인 페이지로 이동
      } catch (error: any) {
        // 4. 에러 처리
        const errorData = error.response?.data;
        console.error("❌ 카카오 로그인 실패:", errorData);

        if (error.response?.status === 404) {
          // 404가 뜨면 회원가입이 안 된 상태일 수 있습니다.
          alert("가입되지 않은 계정입니다. 회원가입 페이지로 이동합니다.");
          router.replace("/signup");
        } else {
          alert(errorData?.message || "로그인 중 오류가 발생했습니다.");
          router.replace("/login");
        }
      }
    };

    loginWithKakao();
  }, [code, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
      <p className="text-lg font-medium text-gray-600">
        카카오 로그인 처리 중...
      </p>
    </div>
  );
}

// useSearchParams를 쓰기 때문에 반드시 Suspense로 감싸야 합니다.
export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <KakaoCallbackContent />
    </Suspense>
  );
}
