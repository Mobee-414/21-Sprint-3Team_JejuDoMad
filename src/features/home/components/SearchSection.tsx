import SearchBar from "./SearchBar"

export default function SearchSection () {
  return (
    <div className="max-w-[1120px] mx-auto flex flex-col items-center gap-10 text-2xl md:text-4xl font-bold">
      <p>
        무엇을 체험하고 싶으신가요?
      </p>
      <SearchBar />
    </div>
  )
}