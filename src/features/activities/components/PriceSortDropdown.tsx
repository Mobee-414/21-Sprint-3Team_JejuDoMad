"use client";

import { Dropdown } from "@/components/ui/dropdown";

type Props = {
  selected: string | undefined;
  onSelect: (sort: string | undefined) => void;
};

export default function SortDropdown({ selected, onSelect }: Props) {
  const label =
    selected === "price_asc"
      ? "가격 낮은순"
      : selected === "price_desc"
        ? "가격 높은순"
        : "가격";

  return (
    <Dropdown>
      <Dropdown.Trigger className="flex gap-[8px] rounded-[12px] px-[16px] py-[8px]">
        {label} <span>▼</span>
      </Dropdown.Trigger>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onSelect("price_asc")}>
          가격 낮은순
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onSelect("price_desc")}>
          가격 높은순
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
