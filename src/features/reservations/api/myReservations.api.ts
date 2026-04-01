import type {
  MyReservationsResponse,
  ReservationStatus,
  CreateReviewRequest,
  CreateReviewResponse,
  CancelReservationResponse,
} from "../types/myReservation.schema";
import { Get, Patch, Post } from "@/shared/api/request";
import {
  myReservationsResponseSchema,
  updateApplicationResponseSchema,
  createReviewResponseSchema,
  cancelReservationResponseSchema,
} from "../types/myReservation.schema";

export const getMyReservations = async ({
  cursor,
  size,
  status,
}: {
  cursor: number | null;
  size: number;
  status?: ReservationStatus | null;
}): Promise<MyReservationsResponse> => {
  return Get("/my-reservations", myReservationsResponseSchema, {
    params: {
      cursorId: cursor,
      size,
      status: status ?? undefined,
    },
  });
};

export const cancelMyReservation = async (
  reservationId: number,
): Promise<CancelReservationResponse> => {
  return Patch(
    `/my-reservations/${reservationId}`,
    cancelReservationResponseSchema,
    {
      status: "canceled",
    },
  );
};

export const updateReservation = (
  reservationId: number,
  body: {
    scheduleId: number;
    headCount: number;
  },
) => {
  return Patch(
    `/my-reservations/${reservationId}/application`,
    updateApplicationResponseSchema,
    body,
  );
};

export const createReview = async ({
  reservationId,
  rating,
  content,
}: {
  reservationId: number;
} & CreateReviewRequest): Promise<CreateReviewResponse> => {
  return Post(
    `/my-reservations/${reservationId}/reviews`,
    createReviewResponseSchema,
    {
      rating,
      content,
    },
  );
};
