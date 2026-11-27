"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/utils";
import { useRef, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import Badge from "../ui/badge/Badge";

export default function UserDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const closeSession = () => {
    document.cookie = "auth_token=; path=/; max-age=0;";
    router.push("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="dropdown-toggle flex items-center gap-2.5 rounded-xl p-1 sm:pe-2.5 transition-colors hover:bg-light dark:hover:bg-black-light border border-transparent hover:border-gray-light dark:hover:border-gray/30 cursor-pointer"
      >
        <div className="relative h-10 w-10 shrink-0 rounded-full ring-2 ring-brand/20 dark:ring-brand/40 bg-brand/10 flex items-center justify-center text-brand font-bold overflow-hidden">
          <img
            width={40}
            height={40}
            src="https://imgs.search.brave.com/wv8hxsCe54rj7_QMQ7Rg_FkU_lUqCO81L_GNaw6DdkA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY2hp/Y2tlbi1saXR0bGUt/YmFja2dyb3VuZC1t/Zzh3dGtmZGtmeGlj/OWtlLmpwZw"
            alt="Foto usuario"
            className="object-cover h-full w-full"
          />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-light-accent dark:ring-gray-dark" />
        </div>

        <div className="hidden text-start sm:block">
          <span className="block text-sm font-semibold text-gray-dark dark:text-light leading-tight">
            User full name
          </span>
          <Badge color="info" variant="light" size="sm">
            Usuario
          </Badge>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray transition-transform duration-200 dark:text-gray-light",
            isOpen ? "rotate-180 text-brand" : ""
          )}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute mt-2 flex w-64 flex-col rounded-2xl border border-gray-light bg-light-accent p-3 shadow-theme-lg right-0 dark:border-gray/30 dark:bg-gray-dark z-50"
      >
        <div className="mb-3 border-b border-gray-light pb-3 dark:border-gray/30">
          <span className="block text-theme-sm font-semibold text-gray-dark dark:text-light">
            User full name
          </span>
          <span className="mt-0.5 block text-xs system-text-theme-light-gray truncate">
            usuario@ejemplo.com
          </span>
        </div>

        <ul className="flex flex-col gap-1 rounded-xl pt-1 pb-1">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-dark hover:bg-light hover:text-gray-dark dark:text-gray-light dark:hover:bg-light-accent/5 dark:hover:text-gray-light"
            >
              <User className="h-4 w-4 text-gray dark:text-gray-light" />
              <span>Mi Perfil</span>
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/settings"
              className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-dark hover:bg-light hover:text-gray-dark dark:text-gray-light dark:hover:bg-light-accent/5 dark:hover:text-gray-light"
            >
              <Settings className="h-4 w-4 text-gray dark:text-gray-light" />
              <span>Configuración</span>
            </DropdownItem>
          </li>
        </ul>

        {/* Cerrar Sesión */}
        <div className="mt-2 border-t border-gray-light pt-2 dark:border-gray/30">
          <button
            onClick={closeSession}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-theme-sm font-medium text-error hover:bg-error/10 dark:hover:bg-error/15 cursor-pointer transition-colors"
          >
            <LogOut className="h-4 w-4 text-error" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
