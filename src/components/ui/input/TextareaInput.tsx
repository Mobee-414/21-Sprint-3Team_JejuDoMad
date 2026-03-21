"use client";

import { TextareaHTMLAttributes, Ref } from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

function TextareaInput({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={clsx(
        "h-[140px] w-full resize-none rounded-[16px] border border-gray-100 pt-[16px] pr-[20px] pb-[16px] pl-[20px] transition-colors duration-200 md:h-[200px]",
        className,
      )}
    />
  );
}

export default TextareaInput;
