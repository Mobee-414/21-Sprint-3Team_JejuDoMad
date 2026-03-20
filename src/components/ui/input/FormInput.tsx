"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, Ref } from "react";

import PasswordInput from "./PasswordInput";
import Input from "./Input";
import TextareaInput from "./TextareaInput";
import { cn } from "@/lib/utils";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  isPassword?: boolean;
  isTextarea?: boolean;
  variant?: "default" | "experience" | "auth";
  ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
}

function FormInput({
  label,
  errorMessage,
  isPassword,
  isTextarea,
  variant = "default",
  ref,
  ...props
}: FormInputProps) {
  const variantLabelStyles = cn({
    "font-bold text-base text-gray-950": variant === "default",
    "font-medium text-base text-gray-950":
      variant === "experience" || variant === "auth",
  });

  const baseBorder = "border border-gray-100 shadow-[0_2px_6px_0_#00000005]";

  const focusBorder =
    "focus:border-[var(--color-primary-500)] focus:outline-none";
  const errorBorder = errorMessage ? "border-red-500" : "";

  return (
    <div className="flex flex-col gap-2.5">
      <label className={variantLabelStyles}>{label}</label>
      {isTextarea ? (
        <TextareaInput
          ref={ref as Ref<HTMLTextAreaElement>}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={cn(baseBorder, focusBorder, errorBorder)}
        />
      ) : isPassword ? (
        <PasswordInput
          ref={ref as Ref<HTMLInputElement>}
          {...props}
          className={cn(baseBorder, focusBorder, errorBorder)}
        />
      ) : (
        <Input
          ref={ref as Ref<HTMLInputElement>}
          {...props}
          className={cn(baseBorder, focusBorder, errorBorder)}
        />
      )}
      <span
        className={cn("pl-2 text-sm", errorMessage ? "text-red-500" : null)}
      >
        {errorMessage || " "}
      </span>
    </div>
  );
}

export default FormInput;
