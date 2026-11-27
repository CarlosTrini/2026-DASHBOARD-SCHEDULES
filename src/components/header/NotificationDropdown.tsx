"use client";

import Link from "next/link";
import { cn } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  return (
    <div className="relative">
      <button
        className="dropdown-toggle relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-light bg-light text-gray transition-colors hover:bg-gray-light/60 hover:text-gray-dark dark:border-gray/30 dark:bg-black-light dark:text-gray-light dark:hover:bg-gray/20 dark:hover:text-light cursor-pointer"
        onClick={handleClick}
        aria-label="Notificaciones"
      >
        <span
          className={cn(
            "absolute top-0.5 right-0 z-10 h-2 w-2 rounded-full bg-orange",
            !notifying ? "hidden" : "flex"
          )}
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
        </span>
        <Bell className="h-5 w-5 text-current" />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="system-generic-border-shadow absolute -left-13.5 mt-4.25 flex h-120 w-87.5 flex-col rounded-2xl bg-light-accent p-3 shadow-theme-lg sm:w-90.25 xl:right-0 xl:left-auto dark:bg-gray-dark"
      >
        <div className="mb-3 flex items-center justify-between">
          <h5 className="text-lg font-semibold text-gray-dark dark:text-gray-light">
            Notificaciones
          </h5>
          <button
            onClick={toggleDropdown}
            className="dropdown-toggle text-gray transition hover:text-gray-dark dark:text-gray-light dark:hover:text-gray-light cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="system-generic-border flex custom-scrollbar h-auto flex-col overflow-y-auto rounded-lg">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 rounded-lg border-b border-gray-light p-3 px-4.5 py-3 hover:bg-light dark:border-gray-dark dark:hover:bg-light-accent/5"
            >
              <span className="relative z-1 block h-10 w-full max-w-10 rounded-full">
                <Image
                  width={40}
                  height={40}
                  src="/images/user/user-02.jpg"
                  alt="Usuario"
                  className="w-full overflow-hidden rounded-full"
                />
                <span className="absolute right-0 bottom-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-light-accent bg-success dark:border-gray-dark" />
              </span>

              <span className="block">
                <span className="mb-1.5 block space-x-1 text-theme-sm text-gray dark:text-gray-light">
                  <span className="font-medium text-gray-dark dark:text-light-accent/90">
                    Terry Franci
                  </span>
                  <span>ha solicitado acceso a</span>
                  <span className="font-medium text-gray-dark dark:text-light-accent/90">
                    Proyecto Dashboard
                  </span>
                </span>

                <span className="flex items-center gap-2 text-theme-xs text-gray dark:text-gray-light">
                  <span>Proyecto</span>
                  <span className="h-1 w-1 rounded-full bg-gray" />
                  <span>hace 5 min</span>
                </span>
              </span>
            </DropdownItem>
          </li>
        </ul>

        <Link
          href="/"
          className="mt-3 block rounded-lg border border-gray-light bg-light-accent px-4 py-2 text-center text-sm font-medium text-gray-dark hover:bg-light dark:border-gray-dark dark:bg-gray-dark dark:text-gray-light dark:hover:bg-gray-dark"
        >
          Ver todas las notificaciones
        </Link>
      </Dropdown>
    </div>
  );
}
