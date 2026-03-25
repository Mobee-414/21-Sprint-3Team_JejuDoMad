"use client";

import Image from "next/image";
import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { ActivityFormType } from "@/features/myActivities/schema";

interface ScheduleInputProps {
  control: Control<ActivityFormType>;
  register: UseFormRegister<ActivityFormType>;
  errors: FieldErrors<ActivityFormType>;
}

export const ScheduleInput = ({
  control,
  register,
  errors,
}: ScheduleInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  return (
    <div className="flex flex-col gap-[16px]">
      <label className="text-16-b text-gray-950">예약 가능한 시간대</label>

      <div className="flex flex-col gap-[16px]">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-[8px] max-md:flex-col md:gap-[12px]"
          >
            <div className="w-full md:flex-1">
              <input
                type="date"
                {...register(`schedules.${index}.date`)}
                className={cn(
                  "w-full rounded-[16px] border border-gray-100 bg-white p-[16px] transition-all outline-none focus:border-black",
                  errors.schedules?.[index]?.date && "border-red-500",
                )}
              />
            </div>

            <div className="flex w-full items-center gap-[6px] md:w-auto md:shrink-0 md:gap-[12px]">
              <div className="flex-1 md:w-[128px]">
                <input
                  type="time"
                  {...register(`schedules.${index}.startTime`)}
                  className="w-full rounded-[16px] border border-gray-100 bg-white p-[16px] px-[8px] text-[14px] outline-none focus:border-black md:px-[16px] md:text-[16px]"
                />
              </div>

              <span className="shrink-0 text-gray-400">—</span>

              <div className="flex-1 md:w-[128px]">
                <input
                  type="time"
                  {...register(`schedules.${index}.endTime`)}
                  className="w-full rounded-[16px] border border-gray-100 bg-white p-[16px] px-[8px] text-[14px] outline-none focus:border-black md:px-[16px] md:text-[16px]"
                />
              </div>

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
        ))}
      </div>

      {errors.schedules && (
        <p className="text-[14px] text-red-500">
          {errors.schedules.message || errors.schedules.root?.message}
        </p>
      )}
    </div>
  );
};
