"use client";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/input/FormInput";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/login";
import { AxiosError } from "axios";

const alertInit = {
  open: false,
  msg: "",
  onClose: () => {},
};

const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [alertModal, setAlertModal] = useState(alertInit);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({ mode: "onChange" });

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (res) => {
      setUser(res.user);
      setAlertModal({
        open: true,
        msg: `${res.user.nickname}님, 환영합니다.`,
        onClose: () => {
          setAlertModal(alertInit);
          router.push("/");
        },
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setAlertModal({
        open: true,
        msg: error.response?.data?.message || "로그인에 실패했습니다.",
        onClose: () => setAlertModal(alertInit),
      });
    },
  });

  const onSubmit = (formData: LoginRequest) => {
    loginMutation.mutate(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[16px] md:gap-[20px]"
      >
        <FormInput
          label="이메일"
          variant="auth"
          type="text"
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: EMAIL_REGEXP,
              message: "이메일 형식으로 작성해주세요.",
            },
            setValueAs: (v) => v.trim(),
          })}
        />
        <FormInput
          label="비밀번호"
          isPassword
          variant="auth"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          errorMessage={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
            minLength: {
              value: 8,
              message: "8자 이상 입력해주세요.",
            },
            setValueAs: (v) => v.trim(),
          })}
        />
        <Button
          type="submit"
          size="lg"
          className="mt-[8px] text-white md:mt-[10px] disabled:cursor-not-allowed"
          disabled={!isValid || loginMutation.isPending}
        >
          {loginMutation.isPending ? "로그인중..." : "로그인하기"}
        </Button>
      </form>
      <Dialog open={alertModal.open} onOpenChange={alertModal.onClose}>
        <DialogContent showOverlay className="w-[400px] max-w-[400px] h-[170px] justify-center">
          <DialogTitle className="px-6 pt-6 pb-2 text-center text-[16px] font-bold">
            {alertModal.msg}
          </DialogTitle>
          <DialogFooter className="items-center p-4">
            <Button onClick={alertModal.onClose} className="w-[200px] h-[47px]">확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
