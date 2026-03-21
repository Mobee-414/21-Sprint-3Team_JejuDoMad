"use client";

import Input from "@/components/ui/input/Input";
import PasswordInput from "@/components/ui/input/PasswordInput";
import { Button } from "@/components/ui/button";

export function EditProfileForm() {
  return (
    <section className="w-full rounded-[12px] border border-border bg-card px-[24px] py-[20px] shadow-sm">
      <div className="flex flex-col gap-[4px] py-[10px]">
        <h2 className="text-18-b text-foreground">내 정보</h2>
        <p className="text-14-m text-muted-foreground">
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </p>
      </div>

      <form className="mt-[24px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="nickname" className="text-16-m text-foreground">
            닉네임
          </label>
          <Input
            id="nickname"
            type="text"
            placeholder="정만철"
            className="h-[54px] text-16-m placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="email" className="text-16-m text-foreground">
            이메일
          </label>
          <Input
            id="email"
            type="email"
            placeholder="codeit@codeit.com"
            className="h-[54px] text-16-m placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="password" className="text-16-m text-foreground">
            비밀번호
          </label>
          <PasswordInput
            placeholder="8자 이상 입력해 주세요"
            className="h-[54px] text-16-m placeholder:text-muted-foreground"
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
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            className="h-[54px] text-16-m placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="h-[48px] w-[120px] rounded-[12px] px-[40px] text-[14px] font-semibold"
          >
            저장하기
          </Button>
        </div>
      </form>
    </section>
  );
}
