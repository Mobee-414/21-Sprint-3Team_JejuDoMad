import { Suspense } from "react";
import SearchBar from "./SearchBar";

export default function SearchSection() {
  return (
    <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-10">
      <p className="h-[20px] w-[327px] text-center text-base font-bold sm:h-[40px] sm:w-[600px] sm:text-2xl md:h-auto md:w-auto md:text-4xl">
        무엇을 체험하고 싶으신가요?
      </p>
      <Suspense>
        <SearchBar />
      </Suspense>
    </div>
  );
}
