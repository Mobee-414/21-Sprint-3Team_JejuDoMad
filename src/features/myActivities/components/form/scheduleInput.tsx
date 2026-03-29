"use client";

import Image from "next/image";
import { useState } from "react";
import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  ActivityFormType,
  ActivityRequest,
} from "@/features/myActivities/types/schema";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dropdown } from "@/components/ui/dropdown";

interface ScheduleInputProps {
  control: Control<ActivityFormType, undefined, ActivityRequest>;
  register: UseFormRegister<ActivityFormType>;
  errors: FieldErrors<ActivityFormType>;
  setValue: UseFormSetValue<ActivityFormType>;
  watch: UseFormWatch<ActivityFormType>;
}

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

export const ScheduleInput = ({
  control,
  register,
  errors,
  setValue,
  watch,
}: ScheduleInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });
  const watchedSchedules = watch("schedules");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[16px]">
      <label className="text-16-b text-gray-950">예약 가능한 시간대</label>

      <div className="flex flex-col gap-[16px]">
        {fields.map((field, index) => {
          const startTime = watchedSchedules[index]?.startTime;
          const endTime = watchedSchedules[index]?.endTime;
          const currentDate = watchedSchedules[index]?.date;

          return (
            <div
              key={field.id}
              className="flex items-center gap-[8px] max-md:flex-col md:gap-[12px]"
            >
              <div className="w-full md:flex-1">
                <Popover
                  open={openIndex === index}
                  onOpenChange={(open) => setOpenIndex(open ? index : null)}
                >
                  <PopoverTrigger
                    type="button"
                    className={cn(
                      "flex h-[56px] w-full items-center justify-between rounded-[16px] border border-gray-100 bg-white p-[16px] text-left transition-all outline-none focus:border-black",
                      "cursor-pointer",
                      !currentDate && "text-gray-400",
                      errors.schedules?.[index]?.date && "border-red-500",
                    )}
                  >
                    {currentDate
                      ? format(new Date(currentDate), "yyyy. MM. dd.", {
                          locale: ko,
                        })
                      : "연도. 월. 일."}
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    side="bottom"
                    sideOffset={8}
                  >
                    <Calendar
                      mode="single"
                      selected={currentDate ? new Date(currentDate) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          setValue(
                            `schedules.${index}.date`,
                            format(date, "yyyy-MM-dd"),
                            { shouldValidate: true },
                          );
                          setOpenIndex(null);
                        }
                      }}
                      locale={ko}
                      autoFocus={false}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex w-full items-center gap-[6px] md:w-auto md:shrink-0 md:gap-[12px]">
                <Dropdown matchTriggerWidth className="flex-1 md:w-[140px]">
                  <Dropdown.Trigger
                    className={cn(
                      "flex h-[56px] w-full items-center justify-between rounded-[16px] border border-gray-100 bg-white px-[16px] text-[16px] outline-none focus:border-black",
                      "group outline-none",
                      !startTime && "text-gray-400",
                    )}
                  >
                    {startTime || "시작 시간"}
                    <Image
                      src="/images/icons/icon_arrow_down.svg"
                      alt="열기"
                      width={24}
                      height={24}
                      className={cn(
                        "transition-transform duration-200",
                        "group-focus-within:rotate-180",
                      )}
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Menu className="max-h-[240px] overflow-y-auto rounded-[16px]">
                    {TIME_OPTIONS.map((time) => (
                      <Dropdown.Item
                        key={time}
                        isActive={startTime === time}
                        onClick={() =>
                          setValue(`schedules.${index}.startTime`, time, {
                            shouldValidate: true,
                          })
                        }
                      >
                        {time}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <div className="flex shrink-0 items-center">
                  <div className="h-[2px] w-[8px] bg-gray-300" />
                </div>

                <Dropdown matchTriggerWidth className="flex-1 md:w-[140px]">
                  <Dropdown.Trigger
                    className={cn(
                      "flex h-[56px] w-full items-center justify-between rounded-[16px] border border-gray-100 bg-white px-[16px] text-[16px] outline-none focus:border-black",
                      "group outline-none",
                      !endTime && "text-gray-400",
                    )}
                  >
                    {endTime || "종료 시간"}
                    <Image
                      src="/images/icons/icon_arrow_down.svg"
                      alt="열기"
                      width={20}
                      height={20}
                      className={cn(
                        "transition-transform duration-200",
                        "group-focus-within:rotate-180",
                      )}
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Menu className="max-h-[240px] overflow-y-auto rounded-[16px]">
                    {/* 시작 시간보다 이후 시간만 필터링 🕵️‍♂️ */}
                    {TIME_OPTIONS.filter(
                      (t) => !startTime || t > startTime,
                    ).map((time) => (
                      <Dropdown.Item
                        key={time}
                        isActive={endTime === time}
                        onClick={() =>
                          setValue(`schedules.${index}.endTime`, time, {
                            shouldValidate: true,
                          })
                        }
                      >
                        {time}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <div className="flex shrink-0 items-center justify-center">
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          date: "",
                          startTime: "12:00",
                          endTime: "13:00",
                        })
                      }
                      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
                    >
                      <Image
                        src="/images/buttons/btn_add.svg"
                        alt="추가"
                        width={44}
                        height={44}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
                    >
                      <Image
                        src="/images/buttons/btn_remove.svg"
                        alt="삭제"
                        width={44}
                        height={44}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {errors.schedules && (
        <p className="text-[14px] text-red-500">
          {errors.schedules.message || errors.schedules.root?.message}
        </p>
      )}
    </div>
  );
};
