import { Delete } from "@/shared/api/request";

export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await Delete(`my-activities/${activityId}`);
};
