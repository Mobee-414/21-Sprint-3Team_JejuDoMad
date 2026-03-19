import apiClient from "@/shared/api/apiClient";
import { LoginRequest, LoginResponse } from "../types/auth";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
