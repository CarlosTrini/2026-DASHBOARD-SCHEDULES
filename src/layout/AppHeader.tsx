"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import { cn } from "@/utils";
import { useEffect, useRef } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import Badge from "@/components/ui/badge/Badge";

const AppHeader: React.FC = () => {
  // HOOKS
  const inputRef = useRef<HTMLInputElement>(null);

  // ZUSTAN - STORE
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { currentHeadquarter } = useHeadquarterStore();


  // FUNCTIONS
  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };


  // EFFECTS

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


  // RENDER
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
          <span className="font-bold text-xs text-gray-dark dark:text-light">
            Dashboard
          </span>
        </Link>

        {/* Badge de Sede Hospitalaria */}
        {
          currentHeadquarter && (
            <Badge variant="light" color="primary" size="sm" pulse={true} className="py-1.5 px-3 hidden! md:flex!" >
              <div className="flex items-center gap-2 ">
                <span className="font-semibold text-gray-dark dark:text-light  max-w-30 md:max-w-50 truncate">{currentHeadquarter?.name}</span>
              </div>
            </Badge>

          )
        }
      </div>

      {/* Lado derecho: Acciones y Perfil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Alternador de Modo Claro/Oscuro */}
        <ThemeToggleButton />

        {/* Notificaciones */}
        <NotificationDropdown />

        {/* Separador vertical */}
        <div className="hidden sm:block h-7 w-px bg-brand-light dark:bg-gray/50 mx-1" />

        {/* Perfil de Usuario */}
        <UserDropdown />
      </div>
    </header>
  );
};

export default AppHeader;
