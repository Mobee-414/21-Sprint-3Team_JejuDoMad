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
        "w-full rounded-2xl border border-gray-100 bg-white pt-4 pr-5 pb-4 pl-5 transition-colors duration-200",
        className,
      )}
    />
  );
}

export default Input;
