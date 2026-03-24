import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const apiClient = axios.create({
  baseURL: "https://sp-globalnomad-api.vercel.app/21-3/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  //const token = useAuthStore.getState().accessToken;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIwMiwidGVhbUlkIjoiMjEtMyIsImlhdCI6MTc3NDMzMTIzOSwiZXhwIjoxNzc1NTQwODM5LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.7rw7q_0EYJ6_0xlfiN0lvnFZ_Pt-3y7n4kbRGPH94vs";
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
