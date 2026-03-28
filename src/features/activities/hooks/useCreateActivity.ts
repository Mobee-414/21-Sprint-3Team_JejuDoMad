"use client";

import { useMutation } from "@tanstack/react-query";
import { postActivity } from "../api/postActivities";

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: postActivity,

    onSuccess: (data) => {
      console.log("등록 성공", data);
    },

    onError: (error) => {
      console.error("등록 실패", error);
    },
  });
};
