"use client";

import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import SideMenu from "@/components/ui/sideMenu";
import { Calendar } from "@/components/ui/calendar";
import { EventBadge } from "@/components/ui/badge/EventBadge";
import { StateBadge } from "@/components/ui/badge/StateBadge";

import IconArrowDown from "@/../public/images/icons/icon_arrow_down.svg";
import IconClose from "@/../public/images/icons/icon_close.svg";
import "@/styles/globals.css";

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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsPopupOpen(true);
  };

  // 현재 데이터 추출
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const dayData = reservationsByDate[dateKey];
  const timeSlots = dayData ? Object.keys(dayData.details) : [];
  const currentReservations = dayData?.details[selectedTime] || [];

  // 탭 필터링 (실제 데이터 연동)
  const filteredItems = currentReservations.filter(
    (item) => item.status === activeTab,
  );

  return (
    <div className="mx-auto mt-10 mb-20 flex flex-col justify-center px-6 lg:w-300 lg:flex-row lg:px-0">
      <div className="hidden lg:block">
        <SideMenu />
      </div>

      <div className="flex w-full flex-1 flex-col lg:ml-12.5 lg:max-w-160">
        <header className="mb-8 lg:max-w-160">
          <h2 className="mb-2 text-18-b text-[#1F1F22]">예약 현황</h2>
          <p className="text-14-m text-[#84858C]">
            내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
          </p>
        </header>

        <div className="mb-8 w-full lg:max-w-160">
          <Dropdown className="w-full">
            <Dropdown.Trigger className="h-14 w-full justify-between rounded-[10px] border border-[#CCCCCC] bg-white px-5">
              <span className="text-16-m">{selectedActivity}</span>
              <Image
                src={IconArrowDown}
                alt="icon_arrow_down"
                width={24}
                height={24}
              />
            </Dropdown.Trigger>

            <Dropdown.Menu className="w-160 rounded-[10px] border-[#EEEEEE] py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
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

        {/* 캘린더 및 팝업 영역 */}
        <div className="relative flex flex-col gap-6 lg:w-160 lg:flex-row">
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
                          <EventBadge
                            key={i}
                            type={res.type}
                            count={res.count}
                          />
                        ))}
                      </div>
                    </button>
                  );
                },
              }}
            />
          </div>

          {isPopupOpen && (
            <div className="absolute right-0 bottom-0 z-10 w-85 translate-x-2.5 animate-in rounded-[30px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] duration-200 zoom-in-95 fade-in">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-20-b text-[#1B1B1B]">
                  {selectedDate && format(selectedDate, "yy년 M월 d일")}
                </h3>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-24-m text-[#1B1B1B] hover:text-gray-500"
                >
                  <Image src={IconClose} alt="close" width={24} height={24} />
                </button>
              </div>

              {/* 탭 메뉴 */}
              <div className="mb-6 flex border-b text-16-b">
                {(["신청", "승인", "거절"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "flex-1 border-b-2 py-3 transition-colors",
                        isActive
                          ? "border-[#3390FF] text-[#3D9EF2]"
                          : "border-transparent text-gray-400",
                      )}
                    >
                      {tab}{" "}
                      {
                        currentReservations.filter((i) => i.status === tab)
                          .length
                      }
                    </button>
                  );
                })}
              </div>

              {/* 예약 시간 영역 */}
              <div className="mb-6">
                <label className="mb-2 block text-18-b text-[#1B1B1B]">
                  예약 시간
                </label>
                <Dropdown className="relative w-full">
                  <Dropdown.Trigger className="h-[52px] w-full justify-between rounded-lg border px-4 text-16-m">
                    {selectedTime}
                    <Image
                      src={IconArrowDown}
                      alt="arrow"
                      width={24}
                      height={24}
                    />
                  </Dropdown.Trigger>
                  {/* 팝업 내부용 드롭다운 메뉴 너비 조절 */}
                  <Dropdown.Menu className="!right-0 mt-1 !w-[320px] rounded-[10px] border-[#EEEEEE] py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                    {timeSlots.length > 0 ? (
                      timeSlots.map((time) => (
                        <Dropdown.Item
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          isActive={selectedTime === time}
                          className={cn(
                            "px-4 py-3 text-left transition-colors hover:bg-[#F1F1F5]",
                            selectedTime === time
                              ? "text-16-b text-[#3390FF]"
                              : "text-16-m text-[#1F1F22]",
                          )}
                        >
                          {time}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-14-m text-gray-400">
                        등록된 시간이 없습니다.
                      </div>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* 예약 내역 리스트 */}
              <div className="space-y-4">
                <p className="text-18-b">예약 내역</p>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[12px] border border-[#EEEEEE] p-4"
                    >
                      <div className="flex flex-col gap-2">
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

                          {activeTab === "신청" ? (
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                className="h-7.5 w-17 rounded-md"
                              >
                                승인하기
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7.5 w-17 rounded-md"
                              >
                                거절하기
                              </Button>
                            </div>
                          ) : activeTab === "거절" ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-7.5 w-17 cursor-default rounded-md"
                            >
                              예약 거절
                            </Button>
                          ) : (
                            <StateBadge variant="approve">예약 승인</StateBadge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-10 text-center text-gray-400">
                    내역이 없습니다.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
