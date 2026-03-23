import AuthFormHelper from "@/features/auth/components/authFormHelper";
import SignupForm from "@/features/auth/components/signup/signupForm";

export default function signup() {
  return (
    <>
      <SignupForm />
      <AuthFormHelper
        mainText="회원이신가요?"
        linkText="로그인하기"
        linkUrl="/login"
      />
    </>
  );
}
