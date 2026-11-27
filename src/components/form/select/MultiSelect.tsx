"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface Option {
  value: string;
  text: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  defaultSelected = [],
  value,
  onChange,
  disabled = false,
  placeholder = "Seleccionar opciones",
}) => {
  const isControlled = value !== undefined;
  const [internalSelected, setInternalSelected] =
    useState<string[]>(defaultSelected);
  const selectedOptions = isControlled ? value : internalSelected;
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    const newSelected = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((v) => v !== optionValue)
      : [...selectedOptions, optionValue];

    if (!isControlled) {
      setInternalSelected(newSelected);
    }
    onChange?.(newSelected);
  };

  const handleRemove = (optionValue: string) => {
    const newSelected = selectedOptions.filter((v) => v !== optionValue);
    if (!isControlled) {
      setInternalSelected(newSelected);
    }
    onChange?.(newSelected);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="mb-1.5 block text-sm font-medium text-gray-dark dark:text-gray-light">
        {label}
      </label>

      <div className="relative">
        <div
          onClick={toggleDropdown}
          className={`flex min-h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-light bg-transparent px-3 py-1.5 shadow-theme-xs transition focus-within:border-brand-light focus-within:ring-3 focus-within:ring-brand/10 dark:border-gray-dark dark:bg-gray-dark ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((val) => {
                const opt = options.find((o) => o.value === val);
                return (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1 rounded-md bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand dark:bg-brand/20 dark:text-brand-light"
                  >
                    <span>{opt?.text || val}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(val);
                      }}
                      className="hover:text-brand-dark dark:hover:text-light cursor-pointer"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                );
              })
            ) : (
              <span className="text-sm text-gray-light dark:text-gray-light">
                {placeholder}
              </span>
            )}
          </div>

          <ChevronDown
            className={`size-4 text-gray dark:text-gray-light transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 z-40 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-light bg-light-accent p-1 shadow-theme-lg dark:border-gray-dark dark:bg-gray-dark">
            {options.map((option, index) => {
              const isSelected = selectedOptions.includes(option.value);
              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition ${
                    isSelected
                      ? "bg-brand/10 font-semibold text-brand dark:bg-brand/20 dark:text-brand-light"
                      : "text-gray-dark hover:bg-light dark:text-gray-light dark:hover:bg-light-accent/5"
                  }`}
                >
                  <span>{option.text}</span>
                  {isSelected && <X className="size-3.5 text-brand" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
