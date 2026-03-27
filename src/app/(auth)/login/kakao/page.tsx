"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuthStore } from "@/store/authStore";
import { kakaoLoginUser } from "@/features/auth/api/login";
import { KAKAO_REDIRECT_URI } from "@/features/auth/constants/kakao";
import { AxiosError } from "axios";

// 모듈 레벨 - StrictMode remount에도 초기화되지 않음
const processedCodes = new Set<string>();

interface ErrorResponse {
  message?: string;
}

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      alert("인가 코드가 없습니다. 다시 시도해주세요.");
      router.replace("/login");
      return;
    }

    if (processedCodes.has(code)) return;
    processedCodes.add(code);

    const loginWithKakao = async () => {
      try {
        const data = await kakaoLoginUser({
          token: code,
          redirectUri: KAKAO_REDIRECT_URI,
        });

        useAuthStore.getState().setUser(data.user);
        router.replace("/");
      } catch (error) {
        if (error instanceof AxiosError) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const status = axiosError.response?.status;
          const message = axiosError.response?.data?.message;
          if (status === 404) {
            alert("가입되지 않은 계정입니다. 회원가입 페이지로 이동합니다.");
            router.replace("/signup");
          } else {
            alert(message || "로그인 중 오류가 발생했습니다.");
            router.replace("/login");
          }
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

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <KakaoCallbackContent />
    </Suspense>
  );
}
