import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useMyPageRedirect(isMainMyPage: boolean) {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = () => {
      if (window.innerWidth >= 768 && isMainMyPage) {
        router.replace("/mypage/myInfo");
      }
    };

    handleRedirect();

    window.addEventListener("resize", handleRedirect);
    return () => window.removeEventListener("resize", handleRedirect);
  }, [isMainMyPage, router]);
}
