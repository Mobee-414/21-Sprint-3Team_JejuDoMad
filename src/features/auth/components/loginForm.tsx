"use client";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/input/FormInput";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/login";
import { AxiosError } from "axios";

const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth); //Zustand 액션 가져오기

  //React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({ mode: "onChange" });

  //TanStack Query (Mutation) 설정
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (res) => {
      setAuth(res.user, res.accessToken);
      alert(`${res.user.nickname}님, 환영합니다.`);
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data?.message || "로그인에 실패했습니다.");
    },
  });

  const onSubmit = (formData: LoginRequest) => {
    loginMutation.mutate(formData);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 md:gap-5"
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
          className="mt-2 md:mt-[10px]"
          disabled={!isValid || loginMutation.isPending}
        >
          {loginMutation.isPending ? "로그인중..." : "로그인하기"}
        </Button>
      </form>
    </>
  );
}
