"use client";

import { InputHTMLAttributes, Ref } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

function Input({ className, ref, ...props }: InputProps) {
  return (
    <input
      {...props}
      ref={ref}
      className={clsx(
        "w-full rounded-[16px] border border-gray-100 bg-white pt-[16px] pr-[20px] pb-[16px] pl-[20px] transition-colors duration-200",
        className,
      )}
    />
  );
}

export default Input;
