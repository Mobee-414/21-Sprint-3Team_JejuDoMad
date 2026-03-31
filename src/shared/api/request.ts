import { AxiosRequestConfig } from "axios";
import { z } from "zod";
import apiClient from "./apiClient";

//런타임 타입 검증 헬퍼-> 서버에서 unknown 데이터를 우리가 정의한 schema와 대조
const validateResponse = <T>(data: unknown, schema: z.ZodSchema<T>): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const treeError = z.treeifyError(result.error);
    console.error("Schema Validation Error:", treeError);
    throw new Error("서버 응답이 기대하는 데이터 구조와 일치하지 않습니다.");
  }
  return result.data;
};

// Get요청 헬퍼
export const Get = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.get(url, config);
  return validateResponse(response.data, schema);
};

// POST 요청 헬퍼
export const Post = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.post(url, data, config);
  return validateResponse(response.data, schema);
};

//PATCH 요청 헬퍼
export const Patch = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.patch(url, data, config);
  console.log("🔥 실제 응답", response.data);
  return validateResponse(response.data, schema);
};

// DELETE 요청 헬퍼
export const Delete = async <T = void>(
  url: string,
  schema?: z.ZodSchema<T>,
  config?: AxiosRequestConfig,
): Promise<T | undefined> => {
  const response = await apiClient.delete(url, config);
  return schema ? validateResponse(response.data, schema) : undefined;
};
