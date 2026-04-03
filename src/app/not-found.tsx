import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <Image
        src="/images/icons/emptyImage.svg"
        alt="페이지를 찾을 수 없음"
        width={120}
        height={120}
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          페이지를 찾을 수 없습니다.
        </h1>
        <p className="text-gray-500 text-sm">
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
      </div>
      <Link
        href="/"
        className="px-6 py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
