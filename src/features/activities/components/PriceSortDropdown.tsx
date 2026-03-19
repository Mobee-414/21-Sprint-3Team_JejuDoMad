"use client";

import { Dropdown } from "@/components/ui/dropdown";

export default function SortDropdown() {
  return (
    <Dropdown>
      <Dropdown.Trigger className="px-4 py-2 rounded-xl flex gap-2">
        가격 <span>▼</span>
      </Dropdown.Trigger>

      <Dropdown.Menu>
        <Dropdown.Item>가격 낮은순</Dropdown.Item>
        <Dropdown.Item>가격 높은순</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}