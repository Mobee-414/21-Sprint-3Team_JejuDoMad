"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

export default function GNB() {
  const { user } = useAuthStore();
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
              <button>
                <Image
                  src={
                    hasNotification
                      ? "/images/icons/icon_bell.svg"
                      : "/images/icons/bell.svg"
                  }
                  alt="Bell"
                  width={24}
                  height={24}
                />
              </button>
              <span>{user?.nickname}</span>
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
