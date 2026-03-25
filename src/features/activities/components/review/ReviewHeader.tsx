import Image from "next/image";

export default function ReviewHeader() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold md:text-xl">체험 후기</h2>
        <span className="text-sm text-gray-500">(1300개)</span>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <span className="mt-2 text-2xl font-bold">4.9</span>
        <span className="mt-1 text-sm text-gray-600">매우 만족</span>
        <span className="mt-1 text-sm text-gray-500">1300개 후기</span>
      </div>
    </div>
  );
}
