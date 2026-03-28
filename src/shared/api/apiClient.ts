import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? "https://21-sprint-3-team-jeju-do-mad.vercel.app/"
  : "http://localhost:3000";

const apiClient = axios.create({
  baseURL: `${baseURL}/api/proxy`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const REDIRECT_STATE = {
  isRedirecting: false,
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;

    // refresh token 만료로 인한 인증 실패 시
    if (
      res?.status === 401 &&
      res?.headers?.["x-auth-error"] === "REFRESH_TOKEN_EXPIRED"
    ) {
      // SSR 에러 방지용 플래그
      if (typeof window !== "undefined") {
        // 중복 리다이렉트 방지용 플래그
        if (!REDIRECT_STATE.isRedirecting) {
          REDIRECT_STATE.isRedirecting = true;
          const currentPath = window.location.pathname + window.location.search;
          window.location.href = `/login?redirect_path=${currentPath}`;
        }
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.post("activities/image", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return response.data.activityImageUrl;
};
