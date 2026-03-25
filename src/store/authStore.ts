import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/features/auth/types/auth";

interface AuthState {
  user: UserInfo | null;
  accessToken: string | null;
  // 유저 정보와 토큰을 동시에 저장 (로그인 시 사용)
  setAuth: (user: UserInfo, token: string) => void;
  // 토큰만 업데이트 (필요 시 사용)
  setAccessToken: (token: string) => void;
  // 로그아웃
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      // 로그인 시 전체 정보 저장
      setAuth: (user, token) => set({ user, accessToken: token }),
      // 토큰만 갱신할 때 사용 (apiClient에서 사용하기 좋음)
      setAccessToken: (token) => set({ accessToken: token }),
      // 로그아웃 시 초기화
      logout: () => {
        set({ user: null, accessToken: null });
        // 로컬 스토리지 비우는 로직은 persist가 알아서 처리해줍니다.
      },
    }),
    {
      name: "auth-storage", // localStorage 키 이름
      // 저장할 데이터만 골라낼 수도 있습니다 (예: 유저 정보와 토큰만)
    },
  ),
);
