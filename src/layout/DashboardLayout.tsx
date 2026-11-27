"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-64"
      : "lg:ml-20";

  return (
    <div className="h-screen overflow-hidden lg:flex">
      {/* Sidebar y Backdrop para navegación móvil */}
      <AppSidebar />
      <Backdrop />

      {/* Área de Contenido Principal */}
      <div
        className={`flex-1 min-w-0 flex flex-col h-screen overflow-hidden transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <div className="shrink-0">
          <AppHeader />
        </div>

        {/* Contenido de la Página */}
        <main
          className={`flex-1 overflow-y-auto p-4 mx-auto max-w-(--breakpoint-content-${
            isExpanded ? "open" : "closed"
          }) md:p-6 w-full min-w-0`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
