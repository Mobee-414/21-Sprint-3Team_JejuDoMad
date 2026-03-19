"use client";
import Image from "next/image";
import Art from "../../../../public/images/icons/icon_art.svg";
import Food from "../../../../public/images/icons/icon_food.svg";
import Tour from "../../../../public/images/icons/icon_tour.svg";
import Travel from "../../../../public/images/icons/icon_bus.svg";
import Wellbeing from "../../../../public/images/icons/icon_wellbeing.svg";

const themes = [
  { name: "문화 · 예술", icon: Art},
  { name: "식음료", icon: Food},
  { name: "투어", icon: Tour},
  { name: "관광", icon: Travel},
  { name: "웰빙", icon: Wellbeing},
];

export default function ThemeFilter() {
  return (
    <div className="flex gap-3 mt-6 flex-wrap">
      {themes.map((theme) => (
        <button
          key={theme.name}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-full
            border
            text-sm font-medium            
            transition
          "
        >
          {theme.icon && (
            <Image
              src={theme.icon}
              alt={theme.name}
              width={20}
              height={20}
            />
          )}
          {theme.name}
        </button>
      ))}
    </div>
  );
}