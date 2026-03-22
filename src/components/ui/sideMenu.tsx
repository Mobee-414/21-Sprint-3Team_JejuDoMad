"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconEdit from "@/../public/images/icons/icon_edit.svg";
import IconUser from "@/../public/images/icons/icon_user.svg";
import IconList from "@/../public/images/icons/icon_list.svg";
import IconSetting from "@/../public/images/icons/icon_setting.svg";
import IconCalendar from "@/../public/images/icons/icon_calendar.svg";

interface SideMenuProps {
  onMenuClick?: () => void;
}

export default function SideMenu({ onMenuClick }: SideMenuProps) {
  const pathname = usePathname();

  const filterDefault =
    "invert(48%) sepia(3%) saturate(728%) hue-rotate(194deg) brightness(90%) contrast(87%)";
  const filterActive =
    "invert(58%) sepia(38%) saturate(5896%) hue-rotate(160deg) brightness(93%) contrast(101%)";

  const menuItems = [
    { label: "내 정보", icon: IconUser, href: "/mypage/myInfo" },
    { label: "예약내역", icon: IconList, href: "/mypage/myReservations" },
    { label: "내 체험 관리", icon: IconSetting, href: "/mypage/activities" },
    { label: "예약 현황", icon: IconCalendar, href: "/mypage/status" },
  ];

  return (
    <div className="flex h-auto w-full flex-col items-center rounded-[12px] border border-[#EDEEF2] bg-white py-[16px] shadow-[0_4px_12px_rgba(156,180,202,0.2)] md:w-[178px] md:px-4 md:py-[16px] lg:h-[450px] lg:w-[291px] lg:py-[24px]">
      {/* 프로필 이미지 */}
      <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full bg-secondary md:h-[70px] md:w-[70px] lg:h-[120px] lg:w-[120px]">
        <Button
          size="icon-sm"
          className="absolute right-[2px] bottom-[4px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#B3B4BC]"
        >
          <Image
            src={IconEdit}
            alt="icon_edit"
            width={16}
            height={16}
            priority
            className="h-auto w-[16px] brightness-0 invert filter-[brightness(0)_invert(1)]"
          />
        </Button>
      </div>

      {/* 메뉴 */}
      <nav className="mt-[24px] w-full space-y-[4px]">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onMenuClick}
              style={
                {
                  "--icon-default": filterDefault,
                  "--icon-active": filterActive,
                } as React.CSSProperties
              }
              className={`group flex h-[54px] w-full cursor-pointer items-center rounded-[16px] px-[14px] transition-colors duration-200 ${isActive ? "bg-[#E5F3FF]" : "hover:bg-[#E5F3FF]"}`}
            >
              <div
                className={`mr-[8px] shrink-0 transition-all duration-200 ${
                  isActive
                    ? "filter-(--icon-active)"
                    : "filter-(--icon-default) group-hover:filter-(--icon-active)"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              </div>

              <span
                className={`text-16-m transition-colors duration-200 ${
                  isActive
                    ? "text-[#1F1F22]"
                    : "text-gray-600 group-hover:text-[#1F1F22]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
