import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyReservations } from "../api/myReservations.api";
import type { MyReservationsResponse } from "../types/reservation.schema";

export function useMyReservations() {
  return useInfiniteQuery({
    queryKey: ["myReservations"] as const,
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      getMyReservations({ cursor: pageParam, size: 3 }),
    initialPageParam: 0 as number | null,
    getNextPageParam: (lastPage: MyReservationsResponse) =>
      lastPage.cursorId ?? null,
  });
}
