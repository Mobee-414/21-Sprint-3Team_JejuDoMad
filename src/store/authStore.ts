import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/features/auth/types/auth";

interface AuthState {
  user: UserInfo | null;
  accessToken: string | null;
  setAuth: (user: UserInfo, token: string) => void; //로그인 처리함수
  logout: () => void; //로그아웃 처리 함수
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, token) => set({ user, accessToken: token }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    { name: "auth-storage" },
  ),
);
