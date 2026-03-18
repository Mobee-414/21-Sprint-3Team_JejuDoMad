"use client"

import { Button } from "@base-ui/react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  // 필터 색상 변수 정의
  const filterDefault = "invert(48%) sepia(3%) saturate(728%) hue-rotate(194deg) brightness(90%) contrast(87%)";
  const filterActive = "invert(58%) sepia(38%) saturate(5896%) hue-rotate(160deg) brightness(93%) contrast(101%)";

  const menuItems = [
    { label: "내 정보", icon: IconUser, href: "/mypage/myInfo" },
    { label: "예약내역", icon: IconList, href: "/mypage/myReservations" },
    { label: "내 체험", icon: IconSetting, href: "/mypage/experiences" },
    { label: "예약 현황", icon: IconCalendar, href: "/mypage/status" },
  ];

  return (
    <div className="bg-white w-[327px] md:w-[178px] lg:w-[291px] h-auto lg:h-[450px] px-[14px] lg:py-6 md:py-4 py-4 rounded-[12px] border-[#EDEEF2] shadow-[0_4px_12px_rgba(156,180,202,0.2)] flex flex-col items-center">
      {/* 프로필 이미지 영역 */}
      <div className="bg-secondary lg:w-[120px] lg:h-[120px] md:w-[70px] md:h-[70px] w-[70px] h-[70px] rounded-full relative flex justify-center items-center">
        <Button size="icon-sm" className="absolute bottom-1 right-0.5 w-[30px] h-[30px] bg-[#B3B4BC] rounded-full flex justify-center items-center">
          <Image 
            src={IconEdit} 
            alt="icon_edit"
            width={16}
            height={16}
            priority
            className="w-4 h-auto invert brightness-0 [filter:brightness(0)_invert(1)]"
          />
        </Button>
      </div>

      {/* 메뉴 리스트 영역 */}
      <nav className="w-full mt-6 space-y-1">
        {menuItems.map((item) => {
          // 현재 페이지 경로와 메뉴의 href가 일치하는지 확인
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={onMenuClick}
              style={{ 
                "--icon-default": filterDefault, 
                "--icon-active": filterActive 
              } as React.CSSProperties}
              
              className={`group w-full h-[54px] flex items-center px-[14px] rounded-[16px] cursor-pointer transition-colors duration-200 
                ${isActive ? "bg-[#E5F3FF]" : "hover:bg-[#E5F3FF]"}
              `}
            >
              
              <div className={`mr-2 flex-shrink-0 transition-all duration-200 
                ${isActive ? "[filter:var(--icon-active)]" : "[filter:var(--icon-default)] group-hover:[filter:var(--icon-active)]"}
              `}>
                <Image src={item.icon} alt={item.label} width={24} height={24} />
              </div>
              
              
              <span className={`text-16-m transition-colors duration-200 
                ${isActive ? "text-[#1F1F22]" : "text-gray-600 group-hover:text-[#1F1F22]"}
              `}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}