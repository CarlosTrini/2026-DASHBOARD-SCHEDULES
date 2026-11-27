"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: string) => void;
}

const SIZE = {
  sm: 'h-8 text-xs',
  md: 'h-11 text-sm',
  lg: 'h-14 text-base',
};

const BUTTON_SIZE = {
  sm: 'py-1.5 ps-2.5 pe-2 text-xs',
  md: 'py-3 ps-3.5 pe-3 text-sm',
  lg: 'py-4 ps-4 pe-3.5 text-base',
};

const CopyInput: React.FC<CopyInputProps> = ({
  value = "",
  size = "md",
  onChange,
  placeholder = "Valor a copiar...",
  className = "",
  ...props
}) => {
  const [textToCopy, setTextToCopy] = useState(value);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    if (onChange) {
      onChange(textToCopy);
    }
  };

  useEffect(() => {
    setTextToCopy(value);
  }, [value]);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleCopy}
        className={`absolute inset-e-0 top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center gap-1.5 border-s border-gray-light font-medium text-gray-dark hover:text-brand dark:border-gray-dark dark:text-gray-light dark:hover:text-brand-light transition-colors ${BUTTON_SIZE[size]}`}
      >
        {copied ? (
          <Check className="size-4 text-success" />
        ) : (
          <Copy className="size-4" />
        )}
        <span>{copied ? "¡Copiado!" : "Copiar"}</span>
      </button>
      <input
        value={textToCopy}
        type="text"
        readOnly
        className={`w-full rounded-lg border border-gray-light bg-transparent ps-4 pe-26 text-gray-dark shadow-theme-xs placeholder:text-gray-light focus:border-brand-light focus:outline-hidden focus:ring-3 focus:ring-brand/10 dark:border-gray-dark dark:bg-gray-dark dark:text-light-accent/90 dark:placeholder:text-light-accent/30 dark:focus:border-brand-dark ${SIZE[size]} ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default CopyInput;
