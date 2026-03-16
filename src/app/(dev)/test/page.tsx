import SearchBar from "@/components/search-bar/SearchBar";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center py-20 gap-6">
      <SearchBar />
      <Input className="w-60" placeholder="검색어를 입력하세요" />
    </main>
  );
}
