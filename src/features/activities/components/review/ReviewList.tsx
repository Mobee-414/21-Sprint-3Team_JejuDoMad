import Image from "next/image";

export default function ReviewList() {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="font-medium">김태현</span>
          <span className="text-sm text-gray-400">2026.03.20</span>
        </div>

        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              src="/images/icons/star.svg"
              alt="별점"
              width={14}
              height={14}
            />
          ))}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉼게
          이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱
          향상되었어요.
        </p>
      </div>
    </div>
  );
}
