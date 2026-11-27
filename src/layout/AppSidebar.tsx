"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import {
  LayoutDashboard,
  Layers,
  Settings,
  LogOut,
  ChevronDown,
  X,
  BarChart3,
  Users,
  Calendar,
  UserCircle2,
  FileCheck,
  Clock,
} from "lucide-react";
import type { SidebarNavItem } from "@/types/navTypes";
import { PREFIX_PATH_ADMIN, ROUTES_LINKS } from "@/utils/constants";

interface NavigationSection {
  title?: string;
  items: SidebarNavItem[];
}



const navigationSections: NavigationSection[] = [
  {
    title: "General",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
        path: ROUTES_LINKS.admin_route,
      },
      {
        key: "analytics",
        label: "Analítica",
        icon: <BarChart3 className="h-5 w-5" />,
        path: ROUTES_LINKS.analytics_route,
        badge: "",
      },
    ],
  },
  {
    title: "Gestión",
    items: [
      {
        key: "clients",
        label: "Clientes",
        icon: <Users className="h-5 w-5" />,
        path: ROUTES_LINKS.clients_route,
      },
      {
        key: "schedules",
        label: "Citas",
        icon: <Calendar className="h-5 w-5" />,
        path: ROUTES_LINKS.schedules_route
      },
      {
        key: "opening-hours",
        label: "Horarios de atención",
        icon: <Clock className="h-5 w-5" />,
        path: ROUTES_LINKS.opending_hours_route,
      }
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        key: "staff",
        label: "Personal",
        icon: <UserCircle2 className="h-5 w-5" />,
        path: ROUTES_LINKS.staff_route
      },
      {
        key: "services",
        label: "Servicios",
        icon: <FileCheck className="h-5 w-5" />,
        path: ROUTES_LINKS.services_route
      }
    ],
  },
  {
    title: "UI",
    items: [
      {
        key: "elements-ui",
        label: "Elementos UI",
        icon: <Layers className="h-5 w-5" />,
        path: `/admin/elements-ui`,
      },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const pathname = usePathname();

  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar } =
    useSidebar();

  const isSidebarVisibleExpanded = isExpanded || isHovered || isMobileOpen;

  const isActive = useCallback(
    (path?: string) => {
      if (!path) return false;
      if (path === `${PREFIX_PATH_ADMIN}` && pathname === `${PREFIX_PATH_ADMIN}`) return true;
      if (path !== `${PREFIX_PATH_ADMIN}` && pathname.startsWith(path)) return true;
      return false;
    },
    [pathname]
  );

  const handleSubmenuToggle = (key: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const closeSession = () => {
    document.cookie = "auth_token=; path=/; max-age=0;";
    if (typeof window !== "undefined") {
      window.location.href = ROUTES_LINKS.signin_route;
    }
  };

  // Detectar y abrir submenú activo al cargar ruta
  useEffect(() => {
    navigationSections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.subItems) {
          const hasActiveChild = item.subItems.some((sub) => isActive(sub.path));
          if (hasActiveChild) {
            setOpenSubmenus((prev) => ({ ...prev, [item.key]: true }));
          }
        }
      });
    });
  }, [pathname, isActive]);

  // Medir dinámicamente altura de submenús abiertos
  useEffect(() => {
    Object.keys(openSubmenus).forEach((key) => {
      if (openSubmenus[key] && subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    });
  }, [openSubmenus]);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 flex h-screen flex-col bg-light-accent dark:bg-gray-dark border-r border-gray-light/80 dark:border-gray/25 transition-all duration-300 ease-in-out shadow-[4px_0_24px_0_rgba(15,23,42,0.04)] dark:shadow-[4px_0_24px_0_rgba(0,0,0,0.35)] select-none",
        isExpanded || isMobileOpen
          ? "w-64"
          : isHovered
            ? "w-64 shadow-[8px_0_32px_0_rgba(15,23,42,0.08)] dark:shadow-[8px_0_32px_0_rgba(0,0,0,0.5)]"
            : "w-20",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Barra lateral de navegación"
    >
      {/* Brand Header */}
      <div
        className={cn(
          "flex h-18 shrink-0 items-center border-b border-gray-light/60 dark:border-white/6 px-4",
          !isSidebarVisibleExpanded ? "justify-center px-0" : "justify-between"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-light shadow-theme-xs transition-transform duration-200 group-hover:scale-105">
            <LayoutDashboard className="h-5 w-5" />
          </div>

          {isSidebarVisibleExpanded && (
            <div className="flex flex-col overflow-hidden animate-in fade-in duration-200">
              <span className="text-sm font-bold tracking-tight text-gray-dark dark:text-light leading-tight">
                Admin Panel
              </span>
              <span className="text-[11px] font-medium text-gray dark:text-gray-400">
                Dashboard Template
              </span>
            </div>
          )}
        </Link>

        {/* Botón Cerrar exclusivo para móvil */}
        {isMobileOpen && (
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray hover:bg-gray-light/60 hover:text-gray-dark dark:text-gray-light dark:hover:bg-white/10 dark:hover:text-light lg:hidden transition-colors cursor-pointer"
            aria-label="Cerrar menú lateral"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Lista de Navegación con Scroll Suave */}
      <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto px-3 py-4 duration-300 ease-linear">
        <nav className="space-y-6" aria-label="Navegación principal">
          {navigationSections.map((section, sIndex) => (
            <div key={section.title || sIndex} className="space-y-1.5">
              {/* Título de Sección o Separador */}
              {isSidebarVisibleExpanded ? (
                section.title && (
                  <h2 className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-gray/70 dark:text-gray/80 uppercase">
                    {section.title}
                  </h2>
                )
              ) : (
                <div className="mx-auto my-2.5 h-px w-8 bg-gray-light dark:bg-white/8" />
              )}

              <ul className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isSubOpen = !!openSubmenus[item.key];
                  const hasActiveChild =
                    item.subItems?.some((sub) => isActive(sub.path)) ?? false;
                  const itemActive = isActive(item.path) || hasActiveChild;

                  return (
                    <li key={item.key} className="relative">
                      {item.subItems ? (
                        /* Item con Submenú Desplegable */
                        <div>
                          <button
                            type="button"
                            onClick={() => handleSubmenuToggle(item.key)}
                            aria-expanded={isSubOpen}
                            aria-controls={`submenu-${item.key}`}
                            className={cn(
                              "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer",
                              itemActive
                                ? "bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light font-semibold"
                                : "text-gray-dark/80 dark:text-light/80 hover:text-gray-dark dark:hover:text-light hover:bg-gray-light/60 dark:hover:bg-white/5",
                              !isSidebarVisibleExpanded
                                ? "justify-center h-10 w-10 mx-auto px-0"
                                : "justify-start"
                            )}
                          >
                            {/* Indicador de barra lateral activo */}
                            {itemActive && isSidebarVisibleExpanded && (
                              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-brand dark:bg-brand-light" />
                            )}

                            {/* Icono */}
                            <span
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center transition-colors",
                                itemActive
                                  ? "text-brand dark:text-brand-light"
                                  : "text-gray dark:text-gray-light group-hover:text-gray-dark dark:group-hover:text-light"
                              )}
                            >
                              {item.icon}
                            </span>

                            {/* Label */}
                            {isSidebarVisibleExpanded && (
                              <span className="truncate">{item.label}</span>
                            )}

                            {/* Badge */}
                            {isSidebarVisibleExpanded && item.badge && (
                              <span className="ms-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand/15 text-brand dark:bg-brand/25 dark:text-brand-light">
                                {item.badge}
                              </span>
                            )}

                            {/* Chevron Toggle */}
                            {isSidebarVisibleExpanded && (
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 shrink-0 transition-transform duration-200 text-gray dark:text-gray-light",
                                  !item.badge && "ms-auto",
                                  isSubOpen && "rotate-180 text-brand dark:text-brand-light"
                                )}
                              />
                            )}

                            {/* Tooltip flotante en colapsado */}
                            {!isSidebarVisibleExpanded && (
                              <div
                                role="tooltip"
                                className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-dark px-3 py-1.5 text-xs font-semibold text-white shadow-theme-md opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1.5 dark:bg-light dark:text-gray-dark"
                              >
                                {item.label}
                                {hasActiveChild && (
                                  <span className="ml-1.5 text-brand-light dark:text-brand">
                                    • Activo
                                  </span>
                                )}
                              </div>
                            )}
                          </button>

                          {/* Lista Desplegable con Animación Suave */}
                          {isSidebarVisibleExpanded && (
                            <div
                              id={`submenu-${item.key}`}
                              ref={(el) => {
                                subMenuRefs.current[item.key] = el;
                              }}
                              className="overflow-hidden transition-all duration-300 ease-in-out"
                              style={{
                                maxHeight: isSubOpen
                                  ? `${subMenuHeight[item.key] || 200}px`
                                  : "0px",
                                opacity: isSubOpen ? 1 : 0,
                              }}
                            >
                              <ul className="ms-5 my-1 space-y-1 border-s border-gray-light dark:border-white/10 ps-3">
                                {item.subItems.map((sub) => {
                                  const subActive = isActive(sub.path);
                                  return (
                                    <li key={sub.key}>
                                      <Link
                                        href={sub.path}
                                        aria-current={subActive ? "page" : undefined}
                                        className={cn(
                                          "group/sub flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand",
                                          subActive
                                            ? "bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light font-semibold"
                                            : "text-gray dark:text-gray-light hover:text-gray-dark dark:hover:text-light hover:bg-gray-light/50 dark:hover:bg-white/4"
                                        )}
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          <span
                                            className={cn(
                                              "h-1.5 w-1.5 rounded-full transition-all duration-200",
                                              subActive
                                                ? "bg-brand dark:bg-brand-light scale-125"
                                                : "bg-gray/60 dark:bg-gray group-hover/sub:bg-gray-dark dark:group-hover/sub:text-light"
                                            )}
                                          />
                                          <span className="truncate">{sub.label}</span>
                                        </div>

                                        {sub.badge && (
                                          <span className="ms-2 inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-gray-light text-gray-dark dark:bg-white/10 dark:text-light">
                                            {sub.badge}
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Enlace Directo */
                        item.path && (
                          <Link
                            href={item.path}
                            aria-current={isActive(item.path) ? "page" : undefined}
                            className={cn(
                              "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand",
                              isActive(item.path)
                                ? "bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light font-semibold"
                                : "text-gray-dark/80 dark:text-light/80 hover:text-gray-dark dark:hover:text-light hover:bg-gray-light/60 dark:hover:bg-white/5",
                              !isSidebarVisibleExpanded
                                ? "justify-center h-10 w-10 mx-auto px-0"
                                : "justify-start"
                            )}
                          >
                            {/* Indicador lateral activo */}
                            {isActive(item.path) && isSidebarVisibleExpanded && (
                              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-brand dark:bg-brand-light" />
                            )}

                            {/* Icono */}
                            <span
                              className={cn(
                                "relative flex h-5 w-5 shrink-0 items-center justify-center transition-colors",
                                isActive(item.path)
                                  ? "text-brand dark:text-brand-light"
                                  : "text-gray dark:text-gray-light group-hover:text-gray-dark dark:group-hover:text-light"
                              )}
                            >
                              {item.icon}

                              {/* Punto de notificación colapsado si tiene badge */}
                              {!isSidebarVisibleExpanded && item.badge && (
                                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-brand" />
                              )}
                            </span>

                            {/* Label */}
                            {isSidebarVisibleExpanded && (
                              <span className="truncate">{item.label}</span>
                            )}

                            {/* Badge */}
                            {isSidebarVisibleExpanded && item.badge && (
                              <span className="ms-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand/15 text-brand dark:bg-brand/25 dark:text-brand-light">
                                {item.badge}
                              </span>
                            )}

                            {/* Tooltip flotante en colapsado */}
                            {!isSidebarVisibleExpanded && (
                              <div
                                role="tooltip"
                                className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-dark px-3 py-1.5 text-xs font-semibold text-white shadow-theme-md opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1.5 dark:bg-light dark:text-gray-dark"
                              >
                                {item.label}
                                {item.badge && (
                                  <span className="ml-1.5 rounded-full bg-brand/20 px-1.5 py-0.5 text-[10px] text-brand-light dark:text-brand font-bold">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            )}
                          </Link>
                        )
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer del Sidebar: Perfil de Usuario & Sesión */}
        <div className="mt-auto border-t border-gray-light/60 dark:border-white/6 pt-3">
          {isSidebarVisibleExpanded ? (
            <div className="flex items-center justify-between gap-2.5 rounded-xl bg-gray-light/40 dark:bg-white/3 p-2 border border-gray-light/50 dark:border-white/4">
              {/* Avatar + Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative h-9 w-9 shrink-0 rounded-full bg-brand/10 ring-1 ring-brand/20 flex items-center justify-center overflow-hidden">
                  <img
                    width={36}
                    height={36}
                    src="https://imgs.search.brave.com/wv8hxsCe54rj7_QMQ7Rg_FkU_lUqCO81L_GNaw6DdkA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY2hp/Y2tlbi1saXR0bGUt/YmFja2dyb3VuZC1t/Zzh3dGtmZGtmeGlj/OWtlLmpwZw"
                    alt="Foto de perfil del usuario"
                    className="h-full w-full object-cover"
                  />
                  <span
                    title="En línea"
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-light-accent dark:ring-gray-dark"
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="truncate text-xs font-semibold text-gray-dark dark:text-light leading-tight">
                    Admin User
                  </span>
                  <span className="truncate text-[11px] text-gray dark:text-gray-400">
                    admin@dashboard.com
                  </span>
                </div>
              </div>

              {/* Botón Logout */}
              <button
                type="button"
                onClick={closeSession}
                title="Cerrar Sesión"
                aria-label="Cerrar Sesión"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray hover:bg-error/10 hover:text-error dark:text-gray-light dark:hover:bg-error/20 dark:hover:text-error-light transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            /* Modo Colapsado: Avatar y Logout Centrados */
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-9 w-9 shrink-0 rounded-full bg-brand/10 ring-1 ring-brand/20 flex items-center justify-center overflow-hidden">
                <img
                  width={36}
                  height={36}
                  src="https://imgs.search.brave.com/wv8hxsCe54rj7_QMQ7Rg_FkU_lUqCO81L_GNaw6DdkA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY2hp/Y2tlbi1saXR0bGUt/YmFja2dyb3VuZC1t/Zzh3dGtmZGtmeGlj/OWtlLmpwZw"
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-light-accent dark:ring-gray-dark" />
              </div>

              <button
                type="button"
                onClick={closeSession}
                title="Cerrar Sesión"
                aria-label="Cerrar Sesión"
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-gray hover:bg-error/10 hover:text-error dark:text-gray-light dark:hover:bg-error/20 dark:hover:text-error-light transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-error px-2.5 py-1 text-xs font-semibold text-white shadow-theme-md opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1.5"
                >
                  Cerrar Sesión
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
