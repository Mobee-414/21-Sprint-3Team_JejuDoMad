"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { KAKAO_AUTH_URL_SIGNUP } from "@/features/auth/constants/kakao";
import KakaoIcon from "public/images/icons/kakaoIcon.svg";
import Image from "next/image";

export default function KakaoSignupButton() {
  const router = useRouter();

  const handleClick = () => router.replace(KAKAO_AUTH_URL_SIGNUP);

  return (
    <>
      <h2 className="relative my-[30px] h-[1px] w-full bg-gray-100 md:my-10">
        <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-background px-[14px] text-center font-medium whitespace-nowrap text-[#79747e]">
          SNS 계정으로 회원가입하기
        </span>
      </h2>
      <Button
        variant="default"
        size="lg"
        className="w-full bg-primary-foreground"
        onClick={handleClick}
      >
        <Image src={KakaoIcon} width={35} height={35} alt="카카오 아이콘" />
        카카오 회원가입
      </Button>
    </>
  );
}
