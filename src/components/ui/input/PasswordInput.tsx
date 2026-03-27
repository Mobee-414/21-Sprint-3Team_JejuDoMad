"use client";

import { useState, type Ref, type ComponentProps } from "react";
import Image from "next/image";
import clsx from "clsx";
import Input from "./Input";

interface PasswordInputProps extends ComponentProps<"input"> {
  ref?: Ref<HTMLInputElement>;
}

function PasswordInput({ className, ref, type, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
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
