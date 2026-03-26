import apiClient from "@/shared/api/apiClient";
import {
  profileImageResponseSchema,
  updateUserRequestSchema,
  userSchema,
} from "../types/user.schema";
import type {
  ProfileImageResponse,
  UpdateUserRequest,
  User,
} from "../types/user.schema";

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get("/users/me");
  return userSchema.parse(response.data);
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const validatedData = updateUserRequestSchema.parse(data);
  const response = await apiClient.patch("/users/me", validatedData);
  return userSchema.parse(response.data);
};

export async function uploadProfileImage(
  file: File,
): Promise<ProfileImageResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.post("/users/me/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return profileImageResponseSchema.parse(response.data);
}
