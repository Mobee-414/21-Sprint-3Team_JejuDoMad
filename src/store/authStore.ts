import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/features/auth/types/auth";

interface AuthState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // localStorage 키 이름
      // 저장할 데이터만 골라낼 수도 있습니다 (예: 유저 정보와 토큰만)
    },
  ),
);
