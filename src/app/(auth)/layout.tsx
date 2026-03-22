import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="px-6 py-16.25 md:py-35">
      <div className="mx-auto max-w-160">
        <h1 className="flex justify-center">
          <Link href="/">
            <Image
              src="/images/icons/logos.svg"
              width={255}
              height={199}
              alt="JejuDoMad 로고 큰 이미지"
              className="hidden md:block"
            />
            <Image
              src="/images/icons/logos.svg"
              width={144}
              height={144}
              alt="JejuDoMad 로고 모바일용 이미지"
              className="md:hidden"
            />
          </Link>
        </h1>
        <main className="mt-10.5 md:mt-15.5">{children}</main>
      </div>
    </div>
  );
}
