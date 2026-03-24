import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";

const CATEGORIES = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

interface CategoryInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const CategoryInput = ({
  value,
  onChange,
  error,
}: CategoryInputProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <label className="text-[16px] font-medium text-gray-950">카테고리</label>
      <Dropdown matchTriggerWidth className="w-full">
        <Dropdown.Trigger
          className={cn(
            "flex h-[56px] w-full items-center justify-between rounded-[16px] border border-gray-100 bg-white p-[16px]",
            !value ? "text-gray-400" : "text-gray-950",
            error && "border-red-500",
          )}
        >
          {value || "카테고리 선택"}
        </Dropdown.Trigger>
        <Dropdown.Menu className="rounded-[16px] border border-gray-100 bg-white py-[8px] shadow-xl">
          {CATEGORIES.map((category) => (
            <Dropdown.Item
              key={category}
              onClick={() => onChange(category)}
              className={cn(
                "px-[16px] py-[12px] text-left hover:bg-gray-50",
                value === category && "bg-gray-50 font-bold",
              )}
            >
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {error && <p className="px-2 text-[14px] text-red-500">{error}</p>}
    </div>
  );
};
