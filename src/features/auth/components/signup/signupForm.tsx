"use client";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/input/FormInput";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { createUser } from "@/features/auth/api/signup";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormDataType {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  termsAgreed: boolean;
}

const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const alertInit = {
  open: false,
  msg: "",
  onClose: () => {},
};

export default function SignupForm() {
  const router = useRouter();
  const [alertModal, setAlertModal] = useState(alertInit);
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormDataType>({ mode: "onChange" });

  const handleSubmitForm = async (formData: FormDataType) => {
    const { email, nickname, password } = formData;

    try {
      await createUser({ email, nickname, password });

      setAlertModal({
        open: true,
        msg: "가입이 완료되었습니다.",
        onClose: () => {
          setAlertModal(alertInit);
          router.replace("/login"); // 성공하면 로그인 페이지로 이동
        },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      if (err.response?.status === 409) {
        // 중복 이메일 체크
        setAlertModal({
          open: true,
          msg: "이미 사용 중인 이메일입니다.",
          onClose: () => setAlertModal(alertInit),
        });
        return;
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-4 md:gap-5"
      >
        <FormInput
          label="이메일"
          variant="auth"
          type="text"
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해 주세요",
            pattern: {
              value: EMAIL_REGEXP,
              message: "이메일 형식으로 작성해 주세요.",
            },
            setValueAs: (v) => v.trim(),
          })}
        />

        <FormInput
          label="닉네임"
          variant="auth"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          errorMessage={errors.nickname?.message}
          {...register("nickname", {
            required: "닉네임을 입력해 주세요",
            maxLength: {
              value: 10,
              message: "10자 이하로 작성해주세요.",
            },
            setValueAs: (v) => v.trim(),
            validate: (value) => {
              if (!value.trim()) return "닉네임을 입력해 주세요";
              if (!/[a-zA-Z0-9가-힣]/.test(value))
                return "닉네임은 한글, 영문, 숫자를 포함해야 합니다.";
              return true;
            },
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
            required: "비밀번호를 입력해 주세요",
            minLength: {
              value: 8,
              message: "8자 이상 입력해주세요.",
            },
            onBlur: () => {
              const passwordConfirm = getValues("passwordConfirm");
              if (passwordConfirm) trigger("passwordConfirm");
            },
            setValueAs: (v) => v.trim(),
          })}
        />

        <FormInput
          label="비밀번호"
          isPassword
          variant="auth"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          errorMessage={errors.passwordConfirm?.message}
          {...register("passwordConfirm", {
            required: "비밀번호를 입력해 주세요",
            validate: (value) => {
              const password = getValues("password");
              if (value !== password) return "비밀번호가 일치하지 않습니다.";
              return true;
            },
            setValueAs: (v) => v.trim(),
          })}
        />

        <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer"
            {...register("termsAgreed", {
              required: true,
            })}
          />
          이용약관에 동의합니다.
        </label>

        <Button
          type="submit"
          size="lg"
          className="mt-2 text-white md:mt-[10px] disabled:cursor-not-allowed"
          disabled={!isValid || isSubmitting}
        >
          회원가입하기
        </Button>
      </form>
      <Dialog open={alertModal.open} onOpenChange={alertModal.onClose}>
        <DialogContent
          showOverlay
          className="h-[170px] w-[360px] max-w-[400px] justify-center"
        >
          <DialogTitle className="px-6 pt-6 text-center text-[16px] font-bold">
            {alertModal.msg}
          </DialogTitle>
          <DialogFooter className="items-center p-4">
            <Button onClick={alertModal.onClose} className="h-[47px] w-[200px]">
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
