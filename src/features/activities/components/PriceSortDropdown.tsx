"use client";

import { Dropdown } from "@/components/ui/dropdown";

export default function SortDropdown() {
  return (
    <Dropdown>
      <Dropdown.Trigger className="flex gap-[8px] rounded-[12px] px-[16px] py-[8px]">
        가격 <span>▼</span>
      </Dropdown.Trigger>

      <Dropdown.Menu>
        <Dropdown.Item>가격 낮은순</Dropdown.Item>
        <Dropdown.Item>가격 높은순</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
