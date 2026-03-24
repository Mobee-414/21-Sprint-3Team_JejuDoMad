import apiClient from "@/shared/api/apiClient";
import { GetMyActivitiesResponse } from "@/features/myActivities/types/activity.types";

export const getMyActivities = async (): Promise<GetMyActivitiesResponse> => {
  const { data } =
    await apiClient.get<GetMyActivitiesResponse>("my-activities");
  return data;
};
