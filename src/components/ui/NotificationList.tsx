"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getMyNotifications } from "@/features/myNotifications/api/getMyNotifications";
import { deleteMyNotifications } from "@/features/myNotifications/api/deleteMyNotifications";
import { formatRelativeTime } from "@/utils/formatTime";
import InfiniteScrollList from "@/shared/components/infinite-scroll/InfiniteScrollList";
import { queryKeys } from "@/shared/api/queryKeys";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function NotificationList() {
  const queryClient = useQueryClient();

  const { data: previewData } = useQuery({
    queryKey: [...queryKeys.myNotifications.all, "preview"],
    queryFn: () =>
      getMyNotifications({
        size: 1,
        cursorId: null,
      }),
  });

  const hasNotification = (previewData?.notifications.length ?? 0) > 0;

  // 알림 삭제 함수
  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await deleteMyNotifications(notificationId);
      // 삭제 성공 후, 무한 스크롤 리스트를 최신화합니다.
      queryClient.invalidateQueries({
        queryKey: queryKeys.myNotifications.all,
      });
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.myNotifications.all, "preview"],
      });
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="relative flex items-center justify-center p-1">
          <Image
            src={
              hasNotification
                ? "/images/icons/icon_alert_bell.svg"
                : "/images/icons/icon_bell.svg"
            }
            alt="알림 종"
            width={hasNotification ? 24 : 16}
            height={hasNotification ? 24 : 16}
          />
        </button>
      </DialogTrigger>

      <DialogContent
        className="absolute top-[60px] right-0 left-auto w-[368px] translate-x-0 translate-y-0 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl"
        showOverlay={false}
      >
        <DialogHeader className="mb-5 flex flex-row items-center justify-between p-0">
          <DialogTitle className="text-xl font-bold text-black">
            알림
          </DialogTitle>
          <DialogClose>
            <Image
              src="/images/icons/icon_close.svg"
              alt="닫기"
              width={24}
              height={24}
              className="cursor-pointer transition-opacity hover:opacity-70"
            />
          </DialogClose>
        </DialogHeader>

        <DialogBody className="flex max-h-[400px] flex-col overflow-y-auto p-0">
          <InfiniteScrollList<any, any, number | null>
            queryKey={queryKeys.myNotifications.all}
            queryFn={(cursor) =>
              getMyNotifications({
                size: 10,
                cursorId: cursor,
              })
            }
            initialPageParam={null}
            getNextCursor={(lastPage) => lastPage.cursorId}
            getItems={(page) => page.notifications}
            renderItem={(item) => {
              // 개별 알림 아이템의 UI (기존 디자인 유지)
              const isFailed =
                item.content.includes("실패") || item.content.includes("거절");

              return (
                <div
                  key={item.id}
                  className="group relative border-b border-gray-100 py-4 last:border-none"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span
                      className={cn(
                        "text-sm font-bold",
                        isFailed ? "text-[#FF472E]" : "text-[#0085FF]",
                      )}
                    >
                      {item.content.includes("승인")
                        ? "예약 승인"
                        : item.content.includes("거절")
                          ? "예약 거절"
                          : "결제 실패"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {formatRelativeTime(item.createdAt)}
                      </span>
                      <button
                        onClick={() => handleDeleteNotification(item.id)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Image
                          src="/images/icons/icon_close.svg"
                          alt="삭제"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm leading-snug break-keep text-gray-800">
                    {item.content}
                  </p>
                </div>
              );
            }}
            empty={
              <div className="py-10 text-center text-sm text-gray-400">
                새로운 알림이 없습니다.
              </div>
            }
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
