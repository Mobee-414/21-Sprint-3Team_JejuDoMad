"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/features/activities/hooks/useMediaQuery";

import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Calendar } from "@/components/ui/calendar";
import { EventBadge } from "@/components/ui/badge/EventBadge";
import { StateBadge } from "@/components/ui/badge/StateBadge";

import IconArrowDown from "@/../public/images/icons/icon_arrow_down.svg";
import IconClose from "@/../public/images/icons/icon_close.svg";
import "@/styles/globals.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogClose,
} from "@/components/ui/dialog";

type ReservationStatus = "신청" | "승인" | "거절";

interface ReservationItem {
  id: number;
  nickname: string;
  headCount: number;
  status: ReservationStatus;
}

const reservationsByDate: Record<
  string,
  {
    summary: {
      type: "reservation" | "approved" | "completed";
      count: number;
    }[];
    details: Record<string, ReservationItem[]>;
  }
> = {
  "2026-03-09": {
    summary: [{ type: "reservation", count: 2 }],
    details: {
      "13:00 - 14:00": [
        { id: 1, nickname: "정만철", headCount: 10, status: "신청" },
        { id: 2, nickname: "김예은", headCount: 11, status: "신청" },
      ],
    },
  },
  "2026-03-10": {
    summary: [
      { type: "approved", count: 1 },
      { type: "completed", count: 1 },
    ],
    details: {
      "14:00 - 15:00": [
        { id: 1, nickname: "정철만", headCount: 11, status: "승인" },
        { id: 2, nickname: "정은지", headCount: 12, status: "거절" },
      ],
    },
  },
  "2026-03-11": {
    summary: [{ type: "reservation", count: 2 }],
    details: {
      "15:00 - 16:00": [
        { id: 1, nickname: "정인수", headCount: 12, status: "신청" },
        { id: 2, nickname: "이혜수", headCount: 13, status: "신청" },
      ],
    },
  },
  "2026-03-12": {
    summary: [{ type: "reservation", count: 2 }],
    details: {
      "16:00 - 17:00": [
        { id: 1, nickname: "정만철", headCount: 13, status: "신청" },
        { id: 2, nickname: "정만철", headCount: 14, status: "신청" },
      ],
    },
  },
};

export default function StatusPage() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<ReservationStatus>("신청");
  const [selectedTime, setSelectedTime] = useState("14:00 - 15:00");
  const [selectedActivity, setSelectedActivity] =
    useState("함께 배우면 즐거운 스트릿 댄스");

  const activityItems = [
    "함께 배우면 즐거운 스트릿 댄스",
    "연인과 사랑의 징검다리",
    "자연 속에서 캠핑하기",
  ];

  // 현재 데이터 추출
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const dayData = reservationsByDate[dateKey];
  const timeSlots = dayData ? Object.keys(dayData.details) : [];
  const currentReservations = dayData?.details[selectedTime] || [];

  // 탭 필터링 (실제 데이터 연동)
  const filteredItems = currentReservations.filter(
    (item) => item.status === activeTab,
  );

  // Hydration 에러 방지: 컴포넌트가 브라우저에 마운트된 후 렌더링 허용
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsPopupOpen(true);
  };

  // 마운트 전에는 아무것도 렌더링하지 않음 (서버-클라이언트 불일치 방지)
  if (!mounted) return null;

  return (
    <div className="flex w-full flex-1 flex-col lg:max-w-160">
      <header className="mb-8 lg:max-w-160">
        <h2 className="mb-2 text-18-b text-[#1F1F22]">예약 현황</h2>
        <p className="text-14-m text-[#84858C]">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </header>

      <div className="mb-8 w-full lg:max-w-160">
        <Dropdown className="w-full" matchTriggerWidth>
          <Dropdown.Trigger className="h-14 w-full justify-between rounded-[10px] border border-[#CCCCCC] bg-white px-5">
            <span className="text-16-m">{selectedActivity}</span>
            <Image
              src={IconArrowDown}
              alt="icon_arrow_down"
              width={24}
              height={24}
            />
          </Dropdown.Trigger>

          <Dropdown.Menu className="rounded-[10px] border-[#EEEEEE] py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            {activityItems.map((item) => (
              <Dropdown.Item
                key={item}
                onClick={() => setSelectedActivity(item)}
                isActive={selectedActivity === item}
                className={cn(
                  "px-5 py-3 text-left transition-colors hover:bg-[#F1F1F5]",
                  selectedActivity === item
                    ? "text-16-b text-[#3390FF]"
                    : "text-16-m text-[#1F1F22]",
                )}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* 캘린더 및 팝업/모달 영역 */}
      <div className="relative flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(d) => d && handleDateClick(d)}
            locale={ko}
            size="lg"
            className="w-full rounded-3xl border bg-white shadow-sm"
            components={{
              DayButton: ({ day, ...props }) => {
                const dKey = format(day.date, "yyyy-MM-dd");
                const data = reservationsByDate[dKey];
                const isSelected =
                  selectedDate && dKey === format(selectedDate, "yyyy-MM-dd");

                return (
                  <button
                    {...props}
                    className={cn(
                      props.className,
                      "relative flex min-h-25 w-full flex-col items-center! pt-4",
                    )}
                  >
                    {data && (
                      <div className="absolute top-2 h-1.5 w-1.5 rounded-full bg-[#FF4747]" />
                    )}
                    <span
                      className={cn(
                        "text-14-m",
                        isSelected && "font-bold text-[#FF4747]",
                      )}
                    >
                      {day.date.getDate()}
                    </span>
                    <div className="mt-2 flex flex-col gap-1">
                      {data?.summary.map((res, i) => (
                        <EventBadge key={i} type={res.type} count={res.count} />
                      ))}
                    </div>
                  </button>
                );
              },
            }}
          />
        </div>

        {/* --- 1. PC 버전 (lg 이상): 캘린더 오른쪽 하단 고정 팝업 --- */}
        {isPopupOpen && (
          <div className="absolute right-[-10px] bottom-[-10px] z-10 hidden w-[429px] animate-in rounded-[30px] border border-[#EEEEEE] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] zoom-in-95 fade-in lg:block">
            <PopupInnerContent isDesktop />
          </div>
        )}

        {/* --- 2. 태블릿/모바일 버전 (lg 미만): 하단 배치 --- */}
        {isPopupOpen && !isDesktop && (
          <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <DialogContent
              className={cn(
                "fixed top-auto bottom-0 left-1/2 -translate-x-1/2 translate-y-0",
                "w-full max-w-none rounded-t-[24px] p-6 md:max-w-none md:p-8",
                "animate-in border-none shadow-[0_4px_24px_rgba(0,0,0,0.2)] duration-300 slide-in-from-bottom",
              )}
            >
              <PopupInnerContent />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );

  /**
   * 내부 콘텐츠 컴포넌트
   * isDesktop 프롭을 통해 DialogClose 에러를 방지합니다.
   */
  function PopupInnerContent({ isDesktop = false }: { isDesktop?: boolean }) {
    return (
      <div className="flex w-full flex-col">
        {/* 헤더 영역 */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-20-b text-[#1B1B1B]">
            {selectedDate && format(selectedDate, "yy년 M월 d일")}
          </h3>
          {/* 에러 방지: PC일 때는 일반 버튼, 모바일일 때는 DialogClose */}
          {isDesktop ? (
            <button
              onClick={() => setIsPopupOpen(false)}
              className="p-1 transition hover:opacity-70"
            >
              <Image src={IconClose} alt="close" width={24} height={24} />
            </button>
          ) : (
            <DialogClose className="p-1 transition hover:opacity-70">
              <Image src={IconClose} alt="close" width={24} height={24} />
            </DialogClose>
          )}
        </div>

        {/* 탭 메뉴 */}
        <div className="mb-6 flex border-b text-16-b">
          {(["신청", "승인", "거절"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 border-b-2 py-3 transition-colors",
                activeTab === tab
                  ? "border-[#3390FF] text-[#3390FF]"
                  : "border-transparent text-[#84858C]",
              )}
            >
              {tab} {currentReservations.filter((i) => i.status === tab).length}
            </button>
          ))}
        </div>

        {/* 콘텐츠 영역: md(태블릿)에서 가로 배치 비율 반영 */}
        <div className="flex flex-col gap-6 md:flex-row lg:flex-col">
          {/* 예약 시간 영역 */}
          <div className="w-full md:max-w-1/2 lg:max-w-160">
            <label className="mb-2 block text-18-b text-[#1B1B1B]">
              예약 시간
            </label>
            <Dropdown className="w-full" matchTriggerWidth>
              <Dropdown.Trigger className="h-[52px] w-full justify-between rounded-lg border border-[#CCCCCC] px-4 text-16-m">
                {selectedTime}
                <Image src={IconArrowDown} alt="arrow" width={24} height={24} />
              </Dropdown.Trigger>
              <Dropdown.Menu className="mt-1 rounded-[10px] border-[#EEEEEE] bg-white py-2 shadow-lg">
                {timeSlots.map((time) => (
                  <Dropdown.Item
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className="cursor-pointer px-4 py-3 text-16-m hover:bg-gray-50"
                  >
                    {time}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* 예약 내역 리스트 영역 */}
          <div className="w-full md:w-1/2 lg:w-full">
            <p className="mb-2 text-18-b text-[#1B1B1B]">예약 내역</p>
            <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto pr-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[12px] border border-[#EEEEEE] bg-white p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-16-b text-[#84858C]">
                          닉네임{" "}
                          <span className="ml-2 text-16-m text-[#1B1B1B]">
                            {item.nickname}
                          </span>
                        </p>
                        <p className="text-16-b text-[#84858C]">
                          인원&emsp;{" "}
                          <span className="ml-2 text-16-m text-[#1B1B1B]">
                            {item.headCount}명
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {activeTab === "신청" ? (
                          <>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-9 w-20 rounded-lg"
                            >
                              승인하기
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-9 w-20 rounded-lg"
                            >
                              거절하기
                            </Button>
                          </>
                        ) : (
                          <StateBadge
                            variant={
                              activeTab === "승인" ? "approve" : "reject"
                            }
                          >
                            {activeTab === "승인" ? "예약 승인" : "예약 거절"}
                          </StateBadge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-14 text-center text-gray-400">
                  내역이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
