"use client";
import Image from "next/image";

const themes = [
  { name: "문화 · 예술", icon: "/images/icons/icon_art.svg" },
  { name: "식음료", icon: "/images/icons/icon_food.svg" },
  { name: "투어", icon: "/images/icons/icon_tour.svg" },
  { name: "관광", icon: "/images/icons/icon_bus.svg" },
  { name: "웰빙", icon: "/images/icons/icon_wellbeing.svg" },
];

export default function ThemeFilter() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {themes.map((theme) => (
        <button
          key={theme.name}
          className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition"
        >
          {theme.icon && (
            <Image src={theme.icon} alt={theme.name} width={20} height={20} />
          )}
          {theme.name}
        </button>
      ))}
    </div>
  );
}
