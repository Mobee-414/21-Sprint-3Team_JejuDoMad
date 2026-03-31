import { Patch } from "@/shared/api/request";
import {
  ReservationDetailSchema,
  type ReservationDetail,
} from "@/features/myStatus/types/schema";

interface UpdateStatusParams {
  activityId: number;
  reservationId: number;
  status: "confirmed" | "declined";
}

/** * 내 체험의 예약 상태(승인/거절)를 업데이트합니다.
 */
export const updateReservationStatus = async ({
  activityId,
  reservationId,
  status,
}: UpdateStatusParams): Promise<ReservationDetail> => {
  return await Patch(
    `my-activities/${activityId}/reservations/${reservationId}`,
    ReservationDetailSchema,
    { status }, // 이 객체가 Request Body로 전달됩니다.
  );
};
