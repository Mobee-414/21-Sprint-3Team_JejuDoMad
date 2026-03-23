"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SideMenu from "@/components/ui/sideMenu";
import { useMyPageRedirect } from "@/features/mypage/hooks/useMyPageRedirect";
import { cn } from "@/lib/utils";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isMainMyPage = pathname === "/mypage";

  useMyPageRedirect(isMainMyPage);

  return (
    <div
      className={cn(
        "mx-auto mt-4 flex w-full flex-col items-center gap-4 px-4 pb-20",
        "md:mt-7.5 md:max-w-186 md:flex-row md:items-start md:gap-7.5 md:px-7.5 md:pb-24",
        "lg:mt-10 lg:max-w-245 lg:gap-7.5 lg:px-10 lg:pb-30",
      )}
    >
      <div
        className={cn(
          "w-full md:w-40 md:shrink-0 lg:w-72.5",
          !isMainMyPage && "hidden md:block",
        )}
      >
        <SideMenu />
      </div>

      <div
        className={cn(
          "mx-auto w-full md:mx-0 md:min-w-0 md:flex-1 lg:max-w-160",
          isMainMyPage && "hidden md:block",
        )}
      >
        {!isMainMyPage && (
          <button
            onClick={() => router.push("/mypage")}
            className="transition-active mb-2 flex items-center gap-2.5 text-gray-700 active:opacity-60 md:hidden"
          >
            <Image
              src="/images/icons/icon_back.svg"
              alt="뒤로가기"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
        )}

        {children}
      </div>
    </div>
  );
}
