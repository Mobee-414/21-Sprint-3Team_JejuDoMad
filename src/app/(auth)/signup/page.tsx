import AuthFormHelper from "@/features/auth/components/authFormHelper";
import SignupForm from "@/features/auth/components/signup/signupForm";
import KakaoSignupButton from "@/features/auth/components/signup/KakaoSignupButton";
import { Suspense } from "react";

export default function signup() {
  return (
    <>
      <SignupForm />
      <Suspense fallback={null}>
        <KakaoSignupButton />
      </Suspense>
      <AuthFormHelper
        mainText="회원이신가요?"
        linkText="로그인하기"
        linkUrl="/login"
      />
    </>
  );
}
