"use client";

import { useState, useEffect, useRef } from "react";
import Input from "@/components/ui/input/Input";
import PasswordInput from "@/components/ui/input/PasswordInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateMe } from "@/features/mypage/users/hooks/useUpdateMe";
import { useMe } from "@/features/mypage/users/hooks/useMe";

export function EditProfileForm() {
  const { data: user } = useMe();
  const updateMeMutation = useUpdateMe();

  const [nickname, setNickname] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (!user) return;

    setNickname(user.nickname);
  }, [user]);

  const checkPasswordError = () => {
    const password = passwordRef.current?.value ?? "";
    const passwordConfirm = passwordConfirmRef.current?.value ?? "";

    if (!password || !passwordConfirm) {
      setPasswordError(false);
      return;
    }

    setPasswordError(password !== passwordConfirm);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const password = passwordRef.current?.value ?? "";
    const passwordConfirm = passwordConfirmRef.current?.value ?? "";

    if (password && password !== passwordConfirm) {
      setPasswordError(true);
      return;
    }

    const isNicknameChanged = nickname !== user.nickname;
    const isPasswordChanged = !!password;

    if (!isNicknameChanged && !isPasswordChanged) {
      toast.message("변경된 내용이 없습니다.");
      return;
    }

    try {
      await updateMeMutation.mutateAsync({
        nickname,
        profileImageUrl: user.profileImageUrl,
        ...(password ? { newPassword: password } : {}),
      });

      if (passwordRef.current) {
        passwordRef.current.value = "";
      }

      if (passwordConfirmRef.current) {
        passwordConfirmRef.current.value = "";
      }

      setPasswordError(false);

      let description = "";

      if (isNicknameChanged && isPasswordChanged) {
        description = "내 정보가 수정되었습니다.";
      } else if (isNicknameChanged) {
        description = "닉네임이 수정되었습니다.";
      } else {
        description = "비밀번호가 수정되었습니다.";
      }

      toast.success("수정 완료", {
        description,
      });
    } catch {
      toast.error("수정 실패");
    }
  };

  return (
    <section className="w-full rounded-[12px] border border-border bg-card px-[24px] py-[20px] shadow-sm">
      <div className="flex flex-col gap-[4px] py-[10px]">
        <h2 className="text-18-b text-foreground">내 정보</h2>
        <p className="text-14-m text-muted-foreground">
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </p>
      </div>

      <form
        className="mt-[24px] flex flex-col gap-[24px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="nickname" className="text-16-m text-foreground">
            닉네임
          </label>
          <Input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`h-[54px] text-16-m ${
              isFocused ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="email" className="text-16-m text-foreground">
            이메일
          </label>
          <Input
            id="email"
            type="email"
            value={user?.email ?? ""}
            disabled
            className="h-[54px] text-16-m text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="password" className="text-16-m text-foreground">
            비밀번호
          </label>
          <PasswordInput
            ref={passwordRef}
            placeholder="8자 이상 입력해 주세요"
            className={`h-[54px] text-16-m placeholder:text-muted-foreground ${
              passwordError ? "border-destructive" : ""
            }`}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            htmlFor="passwordConfirm"
            className="text-16-m text-foreground"
          >
            비밀번호 재입력
          </label>
          <PasswordInput
            ref={passwordConfirmRef}
            onBlur={checkPasswordError}
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            className="h-[54px] text-16-m placeholder:text-muted-foreground"
          />
          {passwordError && (
            <p className="text-14-m text-destructive">
              비밀번호가 일치하지 않습니다
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={updateMeMutation.isPending}
            className="h-[48px] w-[120px] rounded-[12px] px-[40px] text-[14px] font-semibold"
          >
            저장하기
          </Button>
        </div>
      </form>
    </section>
  );
}
