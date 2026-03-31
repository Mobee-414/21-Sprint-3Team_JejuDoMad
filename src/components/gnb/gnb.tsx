"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import NotificationList from "../ui/NotificationList";

export default function GNB() {
  const { user, logout } = useAuthStore();
  const isLogin = !!user;

  //mock data
  const notificationCount = 0;
  const hasNotification = notificationCount > 0;

  return (
    <header className="w-full">
      <div className="mx-auto flex h-[48px] items-center justify-between px-[16px] md:h-[80px] md:px-[200px]">
        <Link href="/">
          <Image
            src="/images/icons/logo_mobile.svg"
            alt="Global Nomad Logo"
            width={32}
            height={32}
            className="md:hidden"
          />

          <Image
            src="/images/icons/logo.svg"
            alt="Global Nomad Logo"
            width={174}
            height={28}
            className="hidden md:block"
          />
        </Link>

        <div className="flex items-center gap-[16px]">
          {isLogin ? (
            <>
              {/* 기존 버튼 대신 NotificationList 컴포넌트 삽입 */}
              <NotificationList />

              <span className="text-sm font-medium">{user?.nickname}</span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login">로그인</Link>
              <Link href="/signup">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
