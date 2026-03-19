'use client';

import { TextareaHTMLAttributes, Ref } from 'react';
import clsx from 'clsx';

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
        'h-[140px] md:h-[200px] border border-gray-100 rounded-2xl w-full pt-4 pr-5 pb-4 pl-5 transition-colors duration-200 resize-none',
        className
      )}
    />
  );
}

export default TextareaInput;
