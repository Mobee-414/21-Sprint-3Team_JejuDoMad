import AuthFormHelper from "@/features/auth/components/authFormHelper";
import { KakaoLoginButton } from "@/features/auth/components/login/kakaoLoginButton";
import LoginForm from "@/features/auth/components/login/loginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <h2 className="relative my-[30px] h-[1px] w-full bg-muted-foreground md:my-[40px]">
        <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-background px-[14px] text-center font-medium whitespace-nowrap text-foreground">
          or
        </span>
      </h2>
      <Suspense fallback={<div>인가코드 받아오는중...</div>}>
        <KakaoLoginButton />
      </Suspense>
      <AuthFormHelper
        mainText="회원이 아니신가요?"
        linkText="회원가입하기"
        linkUrl="/signup"
      />
    </>
  );
}
