"use client";

import { useState, Ref } from "react";
import Image from "next/image";
import clsx from "clsx";
import Input from "./Input";

interface PasswordInputProps {
  placeholder?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

function PasswordInput({
  placeholder,
  className,
  ref,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={clsx(className, "pr-[40px]")}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-1/2 right-[12px] -translate-y-1/2"
      >
        <Image
          src={
            showPassword
              ? "/images/icons/EyeOpenIcon.svg"
              : "/images/icons/EyeOffIcon.svg"
          }
          alt="Toggle Password"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}

export default PasswordInput;
