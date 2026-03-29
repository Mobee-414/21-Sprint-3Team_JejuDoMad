import apiClient from "@/shared/api/apiClient";
import { z } from "zod";
import { ActivityImageResponseSchema } from "../schemas/activity.schema";

export const uploadActivityImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.post("activities/image", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  const validated = ActivityImageResponseSchema.parse(response.data);
  return validated.activityImageUrl;
};
