import SearchBar from "./SearchBar";

export default function SearchSection() {
  return (
    <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-[40px] text-[24px] font-bold md:text-[36px]">
      <p>무엇을 체험하고 싶으신가요?</p>
      <SearchBar />
    </div>
  );
}
