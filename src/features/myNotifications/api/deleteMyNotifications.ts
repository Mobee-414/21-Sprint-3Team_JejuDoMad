import { Delete } from "@/shared/api/request";

export const deleteMyNotifications = async (
  notificationId: number,
): Promise<void> => {
  await Delete(`my-notifications/${notificationId}`);
};
