import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const updateUserRequestSchema = z.object({
  nickname: z.string().optional(),
  profileImageUrl: z.string().nullable().optional(),
  newPassword: z.string().optional(),
});

export const profileImageResponseSchema = z.object({
  profileImageUrl: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type ProfileImageResponse = z.infer<typeof profileImageResponseSchema>;
