import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import React from "react";

export const ThemeToggleButton: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-light bg-light text-gray transition-colors hover:bg-gray-light/60 hover:text-gray-dark dark:border-gray/30 dark:bg-black-light dark:text-gray-light dark:hover:bg-gray/20 dark:hover:text-light cursor-pointer"
      aria-label="Cambiar tema"
    >
      <Sun className="hidden dark:block size-5" />
      <Moon className="dark:hidden size-5" />
    </button>
  );
};
