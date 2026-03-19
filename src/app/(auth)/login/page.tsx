import { KakaoLoginButton } from "@/features/auth/components/kakaoLoginButton";
import LoginForm from "@/features/auth/components/loginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <h2 className="relative my-[30px] h-[1px] w-full bg-muted-foreground md:my-10">
        <span className="absolute top-[50%] left-[50%] -translate-1/2 bg-background px-[14px] text-center font-medium whitespace-nowrap text-foreground">
          or
        </span>
      </h2>
      <Suspense fallback={<div>인가코드 받아오는중...</div>}>
        <KakaoLoginButton />
      </Suspense>
    </>
  );
}
