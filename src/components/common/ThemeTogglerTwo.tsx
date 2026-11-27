"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeTogglerTwo() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex size-14 items-center justify-center rounded-full bg-brand text-light-accent transition-colors hover:bg-brand-dark cursor-pointer"
      aria-label="Cambiar tema"
    >
      <Sun className="hidden dark:block size-6" />
      <Moon className="dark:hidden size-6" />
    </button>
  );
}
