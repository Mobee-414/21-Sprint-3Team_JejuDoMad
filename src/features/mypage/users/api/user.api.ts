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
import { Get, Patch, Post } from "@/shared/api/request";

export const getMe = async (): Promise<User> => {
  return Get("/users/me", userSchema);
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const validatedData = updateUserRequestSchema.parse(data);
  return Patch("/users/me", userSchema, validatedData);
};

export async function uploadProfileImage(
  file: File,
): Promise<ProfileImageResponse> {
  const formData = new FormData();
  formData.append("image", file);

  return Post("/users/me/image", profileImageResponseSchema, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
