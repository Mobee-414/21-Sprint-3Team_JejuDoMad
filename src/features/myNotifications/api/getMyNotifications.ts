import { Get } from "@/shared/api/request";
import {
  MyNotificationsResponseSchema,
  type MyNotificationsResponse,
} from "@/features/myNotifications/types/schema";

export const getMyNotifications = async (params: {
  cursorId?: number | null;
  size: number;
}): Promise<MyNotificationsResponse> => {
  return await Get("my-notifications", MyNotificationsResponseSchema, {
    params,
  });
};
