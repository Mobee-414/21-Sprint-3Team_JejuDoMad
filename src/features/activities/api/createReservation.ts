import { Post } from "@/shared/api/request";
import {
  CreateReservationResponseSchema,
  CreateReservationResponse,
} from "../schemas/activity.schema";

export type CreateReservationParams = {
  scheduleId: number;
  headCount: number;
};

export const createReservation = async (
  activityId: number,
  params: CreateReservationParams,
): Promise<CreateReservationResponse> => {
  return Post(
    `activities/${activityId}/reservations`,
    CreateReservationResponseSchema,
    params,
  );
};
