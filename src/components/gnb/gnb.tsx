"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import NotificationList from "../ui/NotificationList";
import { Dropdown } from "@/components/ui/dropdown";

export default function GNB() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isLogin = !!user;

  const handleLogout = () => {
    logout();
    queryClient.setQueryData(["me"], null);
    queryClient.removeQueries({ queryKey: ["me"] });
    router.push("/");
  };

  const handleMyPage = () => {
    router.push("/mypage");
  };

  //mock data
  const notificationCount = 0;
  const hasNotification = notificationCount > 0;

  return (
    <header className="w-full">
      <div className="mx-auto flex h-[48px] w-full max-w-[1280px] items-center justify-between px-[16px] md:h-[80px] md:px-[24px]">
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

              <Dropdown>
                <Dropdown.Trigger className="flex items-center gap-[10px] outline-none">
                  <div className="relative h-[32px] w-[32px] overflow-hidden rounded-full border border-[#EDEEF2] bg-secondary md:h-[40px] md:w-[40px]">
                    {user?.profileImageUrl ? (
                      <Image
                        src={user.profileImageUrl}
                        alt="프로필 이미지"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Image
                          src="/images/icons/icon_user.svg"
                          alt="기본 프로필"
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
                        />
                      </div>
                    )}
                  </div>

                  <span className="text-[14px] font-medium text-[#1F1F22]">
                    {user?.nickname}
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Menu className="mt-2 w-[160px] rounded-[12px] border-[#EDEEF2] shadow-[0_4px_12px_rgba(156,180,202,0.2)]">
                  <Dropdown.Item onClick={handleMyPage}>
                    마이페이지
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <div className="flex gap-4 text-[14px] font-medium text-[#1F1F22]">
              <Link href="/login" className="hover:text-black">
                로그인
              </Link>
              <Link href="/signup" className="hover:text-black">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
