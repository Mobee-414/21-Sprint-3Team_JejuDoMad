import apiClient from "@/shared/api/apiClient";
import type {
  MyReservationsResponse,
  ReservationStatus,
  CreateReviewRequest,
} from "../types/reservation.schema";

export const getMyReservations = async ({
  cursor,
  size,
  status,
}: {
  cursor: number | null;
  size: number;
  status?: ReservationStatus | null;
}): Promise<MyReservationsResponse> => {
  const response = await apiClient.get("/my-reservations", {
    params: {
      cursorId: cursor,
      size,
      status: status ?? undefined,
    },
  });

  return response.data;
};

export const cancelMyReservation = async (reservationId: number) => {
  const response = await apiClient.patch(`/my-reservations/${reservationId}`, {
    status: "canceled",
  });

  return response.data;
};

export const createReview = async ({
  reservationId,
  rating,
  content,
}: {
  reservationId: number;
} & CreateReviewRequest) => {
  const response = await apiClient.post(
    `/my-reservations/${reservationId}/reviews`,
    {
      rating,
      content,
    },
  );

  return response.data;
};
