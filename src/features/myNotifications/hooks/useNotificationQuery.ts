import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { getMyNotifications } from "../api/getMyNotifications";
import { MyNotificationsResponse } from "../types/schema";

export const useGetMyNotificationsInfinite = () => {
  return useInfiniteQuery<
    MyNotificationsResponse,
    Error,
    any,
    any,
    number | null
  >({
    queryKey: queryKeys.myNotifications.list({ size: 10 }),
    queryFn: ({ pageParam }) =>
      getMyNotifications({
        cursorId: pageParam,
        size: 10,
      }),
    // 핵심: initialPageParam에 타입을 'number | null'로 명시해줍니다.
    initialPageParam: null as number | null,
    // lastPage.cursorId(숫자)가 null과 함께 반환되어도 타입 에러가 나지 않습니다.
    getNextPageParam: (lastPage) => lastPage.cursorId ?? null,
    // 전체 페이지 데이터를 하나의 배열로 합쳐주는 기능
    select: (data) => data.pages.flatMap((page) => page.notifications),
  });
};
