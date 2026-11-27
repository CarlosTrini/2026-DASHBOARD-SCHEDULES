'use client';

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
    Calendar,
    Mail,
    Pencil,
    Trash2,
    TableCellsMerge,
    WalletCardsIcon,
    Search,
    Briefcase,
    Phone,
    MailIcon,
    PhoneCall,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StaffActionService } from "../services";
import type { Staff } from "@/types/systemTypes";
import Fallback from "@/components/fallbackQuery/Fallback";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import Badge from "@/components/ui/badge/Badge";
import Avatar from "@/components/ui/avatar/Avatar";
import AvatarText from "@/components/ui/avatar/AvatarText";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/common/Pagination";
import { useSearchParams } from "next/navigation";
import { useParamsUrl } from "@/hooks/useParamsUrl";

// Configuración de columnas de la tabla
const COLUMNS = [
    { key: "member", label: "Colaborador", align: "text-left" },
    { key: "contact", label: "Contacto", align: "text-left" },
    { key: "role", label: "Rol", align: "text-center" },
    { key: "status", label: "Estado", align: "text-center" },
    { key: "createdAt", label: "Fecha de Alta", align: "text-center" },
    { key: "actions", label: "Acciones", align: "text-right" },
] as const;

// Configuración visual de Roles
const ROLE_CONFIG: Record<Staff["role"], { label: string; color: "primary" | "info" }
> = {
    admin: { label: "Administrador", color: "primary" },
    receptionist: { label: "Recepcionista", color: "info" },
};

// Configuración visual de Estados
const STATUS_CONFIG: Record<
    Staff["status"],
    {
        label: string;
        color: "success" | "error" | "warning" | "dark" | "light";
        pulse?: boolean;
    }
> = {
    active: { label: "Activo", color: "success", pulse: true },
    inactive: { label: "Inactivo", color: "dark" },
    vacation: { label: "Vacaciones", color: "warning" },
    sick: { label: "Incapacidad", color: "error" },
    leave: { label: "Permiso", color: "warning" },
    dayOff: { label: "Día libre", color: "light" },
};

const StaffTable: React.FC = () => {

    // HOOKS
    const { isMobile } = useIsMobile();
    const {
        page,
        limit,
        paginationInfo,
        setPage,
        // setLimit,
        setPaginationInfo,
    } = usePagination({ initLimit: 10, initPage: 1 }); // ESTE ES NECESARIO CADA QUE SE USE EL PAGINADOR
    const { updateAddParam, deleteParam, getParam } = useParamsUrl();

    // STATES
    const [toggleTable, setToggleTable] = useState<"table" | "cards">("table");
    const [searchTerm, setSearchTerm] = useState(getParam('search') || '');




    // QUERY
    // Consulta de datos de personal
    const {
        data: dataStaff,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<Staff[]>({
        queryKey: ["staff-table", page, limit],
        queryFn: () => StaffActionService.getAllStaff(page, limit)
            .then(res => {
                setPaginationInfo({ ...res });
                return res.docs
            }),

        placeholderData: (previousData) => previousData,
    });


    // FUNCTIONS
    // Filtrado de personal en memoria (por nombre, apellido, correo, puesto o rol)
    const filteredStaff = useMemo(() => {
        if (!dataStaff) return [];
        if (!searchTerm.trim()) {
            deleteParam('search');
            return dataStaff;
        }

        const term = searchTerm.toLowerCase().trim();
        const filterData = dataStaff.filter((s) => {
            const fullName = `${s.name} ${s.lastName}`.toLowerCase();
            const email = s.email.toLowerCase();
            const jobPosition = s.jobPosition?.toLowerCase() || "";
            const roleLabel = ROLE_CONFIG[s.role]?.label.toLowerCase() || "";
            const statusLabel = STATUS_CONFIG[s.status]?.label.toLowerCase() || "";
            return (
                fullName.includes(term) ||
                email.includes(term) ||
                jobPosition.includes(term) ||
                roleLabel.includes(term) ||
                statusLabel.includes(term)
            );
        });
        updateAddParam('search', searchTerm);
        return filterData;
    }, [dataStaff, searchTerm]);

    // Formato amigable de fecha
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return isNaN(date.getTime())
            ? dateStr
            : date.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
    };

    // Skeleton Loade
    const StaffSkeleton = () => (
        <div className="w-full rounded-2xl border border-gray/15 bg-light-accent dark:border-gray/20 dark:bg-black-light p-4 space-y-4 animate-pulse">
            <div className="h-10 w-full rounded-xl bg-gray/10 dark:bg-gray/20" />
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between gap-4 py-3 border-b border-gray/10 dark:border-gray/20 last:border-0"
                >
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gray/20 dark:bg-gray/30 shrink-0" />
                        <div className="space-y-1.5">
                            <div className="h-3 w-20 rounded bg-gray/15 dark:bg-gray/20" />
                        </div>
                    </div>
                    <div className="h-4 w-40 rounded bg-gray/15 dark:bg-gray/20 hidden md:block" />
                    <div className="h-6 w-24 rounded-full bg-gray/15 dark:bg-gray/20" />
                    <div className="h-8 w-16 rounded-lg bg-gray/15 dark:bg-gray/20" />
                </div>
            ))}
        </div>
    );



    // EFFECTS
    // Adaptación automática a móvil
    useEffect(() => {
        setToggleTable(isMobile ? "cards" : "table");
    }, [isMobile]);


    // RENDERS
    // Componente de Sin Resultados
    const NoDataStaffPlaceholder = () => (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-3 text-center p-6">
            <figure className="size-16 overflow-hidden rounded-full border border-gray/20">
                <Image
                    src="/images/no-results.jpg"
                    alt="Sin resultados"
                    width={100}
                    height={100}
                    className="object-cover size-full"
                />
            </figure>
            <div className="space-y-1">
                <h4 className="font-bold text-base text-gray-dark dark:text-light-accent">
                    No se encontraron colaboradores
                </h4>
                <p className="text-xs text-gray dark:text-gray-light/70 max-w-sm">
                    {searchTerm
                        ? `No hay coincidencias para "${searchTerm}". Intenta con otro término de búsqueda.`
                        : "No hay personal registrado en este momento."}
                </p>
            </div>
        </div>
    );

    return (
        <div className="flex-1 min-h-0 flex flex-col space-y-3">
            {/* Buscador + Contador + Selector de Vista */}
            <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Buscador de personal */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray dark:text-light" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nombre, puesto, correo, rol o estado..."
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-xl system-generic-border-shadow bg-light dark:bg-black-light text-gray-dark dark:text-light-accent placeholder:text-gray/50 focus:outline-none focus:ring-2 focus:ring-brand/30 transition"
                    />
                </div>

                {/* Acciones y selector de vista */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-xs font-semibold text-gray/70 dark:text-gray-light/70">
                        Coincidencias:{" "}
                        <span className="text-gray-dark dark:text-light-accent font-bold">
                            {filteredStaff.length}
                        </span>
                    </span>

                    {/* Toggle Tabla / Cards (Oculto en móvil) */}
                    {!isMobile && (
                        <div className="flex items-center p-1 rounded-xl border border-gray/20 bg-light-accent dark:border-gray/30 dark:bg-black-light gap-1">
                            <Tooltip content="Vista Tabla">
                                <button
                                    type="button"
                                    onClick={() => setToggleTable("table")}
                                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${toggleTable === "table"
                                        ? "bg-brand text-light-accent shadow-xs"
                                        : "text-gray hover:text-gray-dark dark:text-gray-light/70 dark:hover:text-light-accent"
                                        }`}
                                    aria-label="Vista Tabla"
                                >
                                    <TableCellsMerge className="size-4" />
                                </button>
                            </Tooltip>

                            <Tooltip content="Vista Cards">
                                <button
                                    type="button"
                                    onClick={() => setToggleTable("cards")}
                                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${toggleTable === "cards"
                                        ? "bg-brand text-light-accent shadow-xs"
                                        : "text-gray hover:text-gray-dark dark:text-gray-light/70 dark:hover:text-light-accent"
                                        }`}
                                    aria-label="Vista Cards"
                                >
                                    <WalletCardsIcon className="size-4" />
                                </button>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenedor con Fallback */}
            <Fallback
                id="staff-table-fallback"
                className="flex-1 min-h-0 flex flex-col"
                isLoading={isLoading}
                isError={isError}
                data={filteredStaff}
                errorMsg={error?.message}
                customLoader={<StaffSkeleton />}
                onRetry={() => refetch()}
                noDataPlaceholder={<NoDataStaffPlaceholder />}
            >
                {/* VISTA 1: TABLA (Escritorio / Laptop) */}
                {toggleTable === "table" && (
                    <section className="w-full flex-1 min-h-0 flex flex-col">
                        <div className="w-full flex-1 min-h-0 overflow-hidden rounded-2xl border border-gray/15 bg-light-accent shadow-theme-xs dark:border-gray/20 dark:bg-black-light flex flex-col">
                            <div className="flex-1 min-h-0 overflow-auto custom-scrollbar">
                                <Table className="w-full border-collapse" id="staff-table">
                                    <TableHeader className="sticky top-0 z-10 border-b border-gray/15 bg-brand dark:border-gray/20 dark:bg-brand-dark">
                                        <TableRow>
                                            {COLUMNS.map((col) => (
                                                <TableCell
                                                    key={col.key}
                                                    isHeader
                                                    className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider system-text-theme-light ${col.align}`}>
                                                    {col.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody className="divide-y divide-gray/10 dark:divide-gray/20">
                                        {filteredStaff.map((staff) => {
                                            const role = ROLE_CONFIG[staff.role] || {
                                                label: staff.role,
                                                color: "primary",
                                            };
                                            const status = STATUS_CONFIG[staff.status] || {
                                                label: staff.status,
                                                color: "dark",
                                            };

                                            return (
                                                <TableRow
                                                    key={staff.id}
                                                    className="group transition-colors hover:bg-brand/5 dark:hover:bg-brand/10"
                                                >
                                                    {/* 1. Colaborador (Avatar + Nombre + ID) */}
                                                    <TableCell className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3.5">
                                                            {staff.image ? (
                                                                <Avatar
                                                                    src={staff.image}
                                                                    alt={`${staff.name} ${staff.lastName}`}
                                                                    size="small"
                                                                />
                                                            ) : (
                                                                <AvatarText
                                                                    name={`${staff.name} ${staff.lastName}`}
                                                                    size="small"
                                                                />
                                                            )}
                                                            <div className="space-y-1 flex flex-col min-w-0">
                                                                <span className="text-sm font-semibold text-gray-dark dark:text-light-accent truncate">
                                                                    {staff.name} {staff.lastName}
                                                                </span>
                                                                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-dark dark:text-light-accent">
                                                                    <Briefcase className="size-3.5 text-brand/70 dark:text-brand-light/70 shrink-0" />
                                                                    <span>{staff.jobPosition}</span>
                                                                </div>
                                                                <span className="text-xs italic text-gray/60 dark:text-gray-light/50">
                                                                    ID: {staff.id.slice(0, 8)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </TableCell>



                                                    {/* 3. Contacto (Email / phone) */}
                                                    <TableCell className="px-5 py-4 whitespace-nowrap">
                                                        <div className="space-y-2 text-xs font-medium text-gray-dark dark:text-light-accent">
                                                            <div className="flex items-center gap-1.5">
                                                                <Phone className="size-3.5 text-brand/70 dark:text-brand-light/70 shrink-0" />
                                                                <span>{staff?.phone || "No disponible"}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <PhoneCall className="size-3.5 text-error/70  shrink-0" />
                                                                <span>{staff?.emergencyContact || "No disponible"}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <MailIcon className="size-3.5 text-brand/70 dark:text-brand-light/70 shrink-0" />
                                                                <span>{staff.email || "No disponible"}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    {/* 4. Rol */}
                                                    <TableCell className="px-5 py-4 text-center whitespace-nowrap">
                                                        <Badge color={role.color} variant="light" size="sm">
                                                            {role.label}
                                                        </Badge>
                                                    </TableCell>

                                                    {/* 5. Estado */}
                                                    <TableCell className="px-5 py-4 text-center whitespace-nowrap">
                                                        <Badge
                                                            color={status.color}
                                                            variant="light"
                                                            size="sm"
                                                            pulse={status.pulse}
                                                        >
                                                            {status.label}
                                                        </Badge>
                                                    </TableCell>

                                                    {/* 6. Fecha de Alta */}
                                                    <TableCell className="px-5 py-4 text-center whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-1.5 text-xs text-gray dark:text-gray-light/80">
                                                            <Calendar className="size-3.5 text-gray/50 shrink-0" />
                                                            <span>{formatDate(staff.createdAt)}</span>
                                                        </div>
                                                    </TableCell>

                                                    {/* 7. Acciones */}
                                                    <TableCell className="px-5 py-4 text-right whitespace-nowrap">
                                                        <div className="inline-flex items-center justify-end gap-1.5">
                                                            <Tooltip content="Editar personal">
                                                                <button
                                                                    type="button"
                                                                    className="p-1.5 rounded-lg text-brand hover:bg-brand/10 dark:text-brand-light dark:hover:bg-brand/20 transition cursor-pointer"
                                                                    aria-label="Editar"
                                                                >
                                                                    <Pencil className="size-4" />
                                                                </button>
                                                            </Tooltip>

                                                            <Tooltip content="Eliminar">
                                                                <button
                                                                    type="button"
                                                                    className="p-1.5 rounded-lg text-error hover:bg-error/10 dark:hover:bg-error/20 transition cursor-pointer"
                                                                    aria-label="Eliminar"
                                                                >
                                                                    <Trash2 className="size-4" />
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </section>
                )}

                {/* VISTA 2: CARDS (Móvil y Cuadrícula Responsiva) */}
                {toggleTable === "cards" && (
                    <section className="w-full flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredStaff.map((staff) => {
                                const role = ROLE_CONFIG[staff.role] || {
                                    label: staff.role,
                                    color: "primary",
                                };
                                const status = STATUS_CONFIG[staff.status] || {
                                    label: staff.status,
                                    color: "dark",
                                };

                                return (
                                    <article
                                        key={staff.id}
                                        className="flex flex-col justify-between gap-4 p-5 rounded-2xl border border-gray/15 bg-light-accent shadow-theme-xs hover:border-brand/40 dark:border-gray/20 dark:bg-black-light transition"
                                    >
                                        {/* Header de Tarjeta: Avatar + Nombre + Estado */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                {staff.image ? (
                                                    <Avatar
                                                        src={staff.image}
                                                        alt={`${staff.name} ${staff.lastName}`}
                                                        size="medium"
                                                    />
                                                ) : (
                                                    <AvatarText
                                                        name={`${staff.name} ${staff.lastName}`}
                                                        size="medium"
                                                    />
                                                )}
                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-semibold text-gray-dark dark:text-light-accent truncate">
                                                        {staff.name} {staff.lastName}
                                                    </h4>
                                                    <span className="text-xs text-gray/60 dark:text-gray-light/50">
                                                        ID: {staff.id.slice(0, 8)}
                                                    </span>
                                                </div>
                                            </div>

                                            <Badge
                                                color={status.color}
                                                variant="light"
                                                size="sm"
                                                pulse={status.pulse}
                                            >
                                                {status.label}
                                            </Badge>
                                        </div>

                                        {/* Info Central: Puesto + Rol + Email */}
                                        <div className="space-y-2 pt-2 border-t border-gray/10 dark:border-gray/20 text-xs">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-gray/60 dark:text-gray-light/60 shrink-0">
                                                    Puesto:
                                                </span>
                                                <span className="font-semibold text-gray-dark dark:text-light-accent truncate">
                                                    {staff.jobPosition}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-gray/60 dark:text-gray-light/60">
                                                    Rol:
                                                </span>
                                                <Badge color={role.color} variant="light" size="sm">
                                                    {role.label}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-gray/60 dark:text-gray-light/60">
                                                    Email:
                                                </span>
                                                <span className="font-mono text-gray-dark dark:text-gray-light truncate max-w-45">
                                                    {staff?.email || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray/60 dark:text-gray-light/60">
                                                    Teléfono:
                                                </span>
                                                <span className="font-mono text-gray-dark dark:text-gray-light truncate max-w-45">
                                                    {staff.phone || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-error/60 dark:text-error-light/60">
                                                    Teléfono Emergencia:
                                                </span>
                                                <span className="font-mono text-gray-dark dark:text-gray-light truncate max-w-45">
                                                    {staff?.emergencyContact || 'N/A'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Footer de Tarjeta: Fecha de Alta + Botones de Acción */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray/10 dark:border-gray/20">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-gray/70 dark:text-gray-light/60">
                                                <Calendar className="size-3.5 text-brand" />
                                                {formatDate(staff.createdAt)}
                                            </span>

                                            <div className="flex items-center gap-1">
                                                <Tooltip content="Editar">
                                                    <button
                                                        type="button"
                                                        className="p-1.5 rounded-lg text-brand hover:bg-brand/10 transition cursor-pointer"
                                                        aria-label="Editar"
                                                    >
                                                        <Pencil className="size-4" />
                                                    </button>
                                                </Tooltip>

                                                <Tooltip content="Eliminar">
                                                    <button
                                                        type="button"
                                                        className="p-1.5 rounded-lg text-error hover:bg-error/10 transition cursor-pointer"
                                                        aria-label="Eliminar"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}


                <div className="shrink-0 pt-2">
                    <Pagination
                        paginationInfo={paginationInfo}
                        onPageChange={setPage}
                        currentPage={page}
                    />
                </div>

            </Fallback>
        </div>
    );
};

export default StaffTable;
