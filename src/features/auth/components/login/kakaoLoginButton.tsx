"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { KAKAO_AUTH_URL } from "../../constants/kakao";
import { Button } from "@/components/ui/button";
import KakaoIcon from "public/images/icons/kakaoIcon.svg";
import Image from "next/image";

export function KakaoLoginButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect_path");

  const linkUrl = redirectPath
    ? `${KAKAO_AUTH_URL}&state=${redirectPath}`
    : KAKAO_AUTH_URL;

  const handleClick = () => router.replace(linkUrl);
  return (
    <>
      <Button
        variant="default"
        size="lg"
        onClick={handleClick}
        className="text- w-full bg-primary-foreground"
      >
        <Image
          src={KakaoIcon}
          width={35}
          height={35}
          alt="카카오 아이콘"
          className="group-hover:invert-100"
        />
        카카오 로그인
      </Button>
    </>
  );
}
