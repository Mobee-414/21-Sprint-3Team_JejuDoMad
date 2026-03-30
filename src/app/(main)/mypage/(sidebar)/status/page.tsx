"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getMyActivities } from "@/features/myStatus/api/getMyActivitys";
import { useGetReservationDashboard } from "@/features/myStatus/hooks/useGetReservationDashboard";
import { useGetReservedSchedule } from "@/features/myStatus/hooks/useGetReservedSchedule";
import { useUpdateReservationStatus } from "@/features/myStatus/hooks/useUpdateReservationStatus";
import { fetchReservationList } from "@/features/myStatus/types/schema";
import InfiniteScrollList from "@/shared/components/infinite-scroll/InfiniteScrollList";
import { queryKeys } from "@/shared/api/queryKeys";
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
import MyStatusEmpty from "@/features/myStatus/components/myStatusEmpty";

import IconArrowDown from "@/../public/images/icons/icon_arrow_down.svg";
import IconClose from "@/../public/images/icons/icon_close.svg";
import "@/styles/globals.css";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

type ReservationStatus = "신청" | "승인" | "거절";

interface ReservationItem {
  id: number;
  nickname: string;
  headCount: number;
  status: ReservationStatus;
}

export default function StatusPage() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // 1. 모든 상태(State) 선언 (중복 금지!)
  const [selectedActivity, setSelectedActivity] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"신청" | "승인" | "거절">("신청");
  const [selectedTime, setSelectedTime] = useState("14:00 - 15:00");

  // 2. 현재 날짜 계산
  const currentYear = selectedDate
    ? format(selectedDate, "yyyy")
    : format(new Date(), "yyyy");
  const currentMonth = selectedDate
    ? format(selectedDate, "MM")
    : format(new Date(), "MM");
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  // 3. API 데이터 호출
  const { data: myActivitiesData } = useQuery({
    queryKey: queryKeys.myActivities.all,
    queryFn: getMyActivities,
  });

  const { data: dashboardData } = useGetReservationDashboard(
    selectedActivity?.id,
    currentYear,
    currentMonth,
  );

  // 1. 날짜별 스케줄(시간대) 조회
  const { data: scheduleData } = useGetReservedSchedule(
    selectedActivity?.id,
    dateKey,
  );

  // 2. 시간대 목록 추출 (Dropdown에 뿌려줄 데이터)
  const timeSlots =
    scheduleData?.map((s) => `${s.startTime} - ${s.endTime}`) || [];

  // 3. 선택된 시간의 scheduleId 찾기 (명단을 불러오기 위해 필요)
  const currentScheduleId = scheduleData?.find(
    (s) => `${s.startTime} - ${s.endTime}` === selectedTime,
  )?.scheduleId;

  // 4. 진짜 예약자 명단 불러오기
  // (탭이 '신청'이면 pending, '승인'이면 confirmed, '거절'이면 declined)
  const statusMap = { 신청: "pending", 승인: "confirmed", 거절: "declined" };

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateReservationStatus(selectedActivity?.id || 0);

  const activityItems = myActivitiesData?.activities || [];

  useEffect(() => {
    if (activityItems.length > 0 && !selectedActivity) {
      setSelectedActivity({
        id: activityItems[0].id,
        title: activityItems[0].title,
      });
    }
  }, [activityItems, selectedActivity]);

  // scheduleData가 로드되거나 날짜(dateKey)가 바뀔 때 실행됩니다.
  // 이 로직이 "데이터에 맞는 시간"을 찾아주는 핵심입니다.
  useEffect(() => {
    if (timeSlots && timeSlots.length > 0) {
      // 데이터가 있다면 그 날의 첫 번째 시간을 선택
      setSelectedTime(timeSlots[0]);
    } else {
      // 그 날에 운영하는 시간대가 아예 없다면 비워둠
      setSelectedTime("선택 가능한 시간이 없습니다");
    }
  }, [dateKey, scheduleData]);

  // Hydration 에러 방지: 컴포넌트가 브라우저에 마운트된 후 렌더링 허용
  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트 전에는 아무것도 렌더링하지 않음 (서버-클라이언트 불일치 방지)
  if (!mounted) return null;

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsPopupOpen(true);
  };

  return (
    <div className="flex w-full flex-1 flex-col lg:max-w-160">
      <header className="mb-8 lg:max-w-160">
        <h2 className="mb-2 text-18-b text-[#1F1F22]">예약 현황</h2>
        <p className="text-14-m text-[#84858C]">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </header>

      {activityItems.length === 0 ? (
        <MyStatusEmpty />
      ) : (
        <>
          <div className="mb-8 w-full lg:max-w-160">
            <Dropdown className="w-full" matchTriggerWidth>
              <Dropdown.Trigger className="h-14 w-full justify-between rounded-[10px] border border-[#CCCCCC] bg-white px-5">
                {/* 1. 글자 대신 selectedActivity?.title을 보여줍니다. */}
                <span className="text-16-m">
                  {selectedActivity?.title || "체험을 선택해주세요"}
                </span>
                <Image
                  src={IconArrowDown}
                  alt="icon_arrow_down"
                  width={24}
                  height={24}
                />
              </Dropdown.Trigger>
              <Dropdown.Menu className="rounded-[10px] border-[#EEEEEE] py-2 shadow-lg">
                {activityItems.map((item) => (
                  <Dropdown.Item
                    key={item.id} // 2. key를 item 대신 item.id로 변경
                    onClick={() =>
                      setSelectedActivity({ id: item.id, title: item.title })
                    } // 3. 클릭 시 객체 저장
                    isActive={selectedActivity?.id === item.id} // 4. 활성화 체크도 id로 변경
                    className={cn(
                      "px-5 py-3 text-left transition-colors hover:bg-[#F1F1F5]",
                      selectedActivity?.id === item.id
                        ? "text-16-b text-[#3390FF]"
                        : "text-16-m text-[#1F1F22]",
                    )}
                  >
                    {item.title} {/* 5. 글자 대신 item.title 출력 */}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="relative flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => {
                  if (d) {
                    setSelectedDate(d);
                    setIsPopupOpen(true);
                  } else {
                    // 이미 선택된 날짜를 다시 눌렀을 때 (d가 undefined로 들어옴)
                    // 현재 선택된 날짜(selectedDate)를 그대로 유지하며 팝업만 열어줍니다.
                    setIsPopupOpen(true);
                  }
                }}
                // 달력의 화살표를 눌러 월을 바꿀 때, 선택된 날짜를 해당 월의 1일로 변경합니다.
                onMonthChange={(month) => setSelectedDate(month)}
                locale={ko}
                size="lg"
                className="w-full rounded-3xl border bg-white shadow-sm"
                components={{
                  DayButton: ({ day, ...props }) => {
                    const dKey = format(day.date, "yyyy-MM-dd");

                    // 진짜 데이터(dashboardData)에서 현재 날짜와 일치하는 정보를 찾습니다.
                    const dayInfo = dashboardData?.find(
                      (item) => item.date === dKey,
                    );

                    const isSelected =
                      selectedDate &&
                      dKey === format(selectedDate, "yyyy-MM-dd");

                    return (
                      <button
                        {...props}
                        className={cn(
                          props.className,
                          "relative flex min-h-25 w-full flex-col items-center! pt-4",
                        )}
                      >
                        {/* 1. 예약이 하나라도 있으면 빨간 점 표시 */}
                        {dayInfo &&
                          (dayInfo.reservations.pending > 0 ||
                            dayInfo.reservations.confirmed > 0) && (
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

                        {/* 2. 실제 데이터 숫자에 맞춰 배지 표시 */}
                        <div className="mt-2 flex flex-col gap-1">
                          {dayInfo && dayInfo.reservations.pending > 0 && (
                            <EventBadge
                              type="reservation"
                              count={dayInfo.reservations.pending}
                            />
                          )}
                          {dayInfo && dayInfo.reservations.confirmed > 0 && (
                            <EventBadge
                              type="approved"
                              count={dayInfo.reservations.confirmed}
                            />
                          )}
                          {dayInfo && dayInfo.reservations.completed > 0 && (
                            <EventBadge
                              type="completed"
                              count={dayInfo.reservations.completed}
                            />
                          )}
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
        </>
      )}
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
              {tab}{" "}
              {tab === "신청"
                ? scheduleData?.find(
                    (s) => `${s.startTime} - ${s.endTime}` === selectedTime,
                  )?.count.pending || 0
                : tab === "승인"
                  ? scheduleData?.find(
                      (s) => `${s.startTime} - ${s.endTime}` === selectedTime,
                    )?.count.confirmed || 0
                  : scheduleData?.find(
                      (s) => `${s.startTime} - ${s.endTime}` === selectedTime,
                    )?.count.declined || 0}
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
              {/* ✨ 공통 컴포넌트로 교체 */}
              <InfiniteScrollList
                // 쿼리 키 (필터가 바뀔 때마다 새로 로드)
                queryKey={[
                  ...queryKeys.reservation.all,
                  "details",
                  currentScheduleId,
                  activeTab,
                ]}
                // 데이터 요청 함수 (cursor 파라미터 활용)
                queryFn={(cursor) =>
                  fetchReservationList(selectedActivity!.id, {
                    size: 10,
                    status: statusMap[activeTab],
                    scheduleId: currentScheduleId,
                    cursorId: cursor as number | null,
                  })
                }
                initialPageParam={null}
                // 다음 페이지 ID 추출 (서버 응답 데이터 구조에 맞게)
                getNextCursor={(lastPage) => lastPage.nextCursorId}
                // 페이지 데이터에서 리스트 추출
                getItems={(page) => page.reservations}
                // 리스트 아이템 하나하나 렌더링 (기존 카드 UI 그대로 복사)
                renderItem={(item) => (
                  <div
                    key={item.id}
                    className="mb-4 rounded-[12px] border border-[#EEEEEE] bg-white p-4"
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
                              onClick={() =>
                                updateStatus({
                                  reservationId: item.id,
                                  status: "confirmed",
                                })
                              }
                              disabled={isUpdating}
                            >
                              승인하기
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-9 w-20 rounded-lg"
                              onClick={() =>
                                updateStatus({
                                  reservationId: item.id,
                                  status: "declined",
                                })
                              }
                              disabled={isUpdating}
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
                )}
                // 예외 상황 UI
                empty={
                  <div className="py-14 text-center text-gray-400">
                    내역이 없습니다.
                  </div>
                }
                loading={
                  <div className="py-14 text-center text-gray-400">
                    로딩 중...
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
