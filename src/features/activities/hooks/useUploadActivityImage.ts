"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadActivityImage } from "../api/uploadActivityImage";

export const useUploadActivityImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadActivityImage(file),
    onError: () => {
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
