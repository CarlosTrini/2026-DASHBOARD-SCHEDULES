"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import { cn } from "@/utils";
import { useEffect, useRef } from "react";
import { Menu, X, Search, LayoutDashboard } from "lucide-react";

const AppHeader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-18 w-full items-center justify-between border-b border-gray-light/80 bg-light-accent/95 px-4 backdrop-blur-md sm:px-6 dark:border-gray/15 dark:bg-gray-dark/95 shadow-[0_4px_24px_0_rgba(15,23,42,0.04)] dark:shadow-[0_4px_24px_0_rgba(0,0,0,0.35)] transition-all duration-300">
      {/* Lado izquierdo: Botón colapsar + Barra de Búsqueda */}
      <div className="flex items-center gap-3 lg:gap-4 flex-1">
        {/* Botón Toggle del Sidebar */}
        <button
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-light bg-light text-gray transition-colors hover:bg-gray-light/60 hover:text-gray-dark dark:border-gray/30 dark:bg-black-light dark:text-gray-light dark:hover:bg-gray/20 dark:hover:text-light cursor-pointer",
            isMobileOpen ? "bg-light dark:bg-gray/20" : ""
          )}
          onClick={handleToggle}
          aria-label="Alternar barra lateral"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5 rtl:-scale-x-100" />
          )}
        </button>

        {/* Logo Móvil */}
        <Link href="/" className="lg:hidden flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-light">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="font-bold text-sm text-gray-dark dark:text-light">
            Dashboard
          </span>
        </Link>

        {/* Barra de Búsqueda de Escritorio */}
        <div className="hidden lg:block w-full max-w-md">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray/50 dark:text-gray-light/40">
              <Search className="h-4 w-4" />
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar... (Ctrl + K)"
              className="h-10 w-full rounded-xl border border-gray-light bg-light pl-9 pr-14 text-sm text-gray-dark placeholder:text-gray/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand dark:border-gray/30 dark:bg-black-light dark:text-light dark:placeholder:text-gray-light/40"
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="rounded border border-gray-light px-1.5 py-0.5 text-2xs font-mono text-gray/60 dark:border-gray/30 dark:text-gray-light/60">
                ⌘K
              </kbd>
            </span>
          </div>
        </div>
      </div>

      {/* Lado derecho: Acciones y Perfil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Alternador de Modo Claro/Oscuro */}
        <ThemeToggleButton />

        {/* Notificaciones */}
        <NotificationDropdown />

        {/* Separador vertical */}
        <div className="hidden sm:block h-7 w-px bg-gray-light dark:bg-gray/30 mx-1" />

        {/* Perfil de Usuario */}
        <UserDropdown />
      </div>
    </header>
  );
};

export default AppHeader;
