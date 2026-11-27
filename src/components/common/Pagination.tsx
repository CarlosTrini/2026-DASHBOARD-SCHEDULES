'use client';

import { useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { ResponseDataPaginated } from "@/types/apiTypes";

interface Props<T> {
    paginationInfo: ResponseDataPaginated<T> | null;
    currentPage?: number;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
    limitOptions?: number[];
    showResultsSummary?: boolean;
    className?: string;
}

export default function Pagination<T>({
    paginationInfo,
    currentPage,
    onPageChange,
    onLimitChange,
    limitOptions = [5, 10, 20, 50],
    showResultsSummary = true,
    className = "",
}: Props<T>) {
    const totalPages = paginationInfo?.totalPages ?? 0;
    const page = currentPage ?? paginationInfo?.page ?? 1;
    const limit = paginationInfo?.limit ?? 10;
    const totalDocs = paginationInfo?.totalDocs ?? 0;
    const hasPrevPage = paginationInfo?.hasPrevPage ?? page > 1;
    const hasNextPage = paginationInfo?.hasNextPage ?? page < totalPages;

    // Rango de elementos mostrados: "1 a 10 de 45"
    const startItem = totalDocs === 0 ? 0 : (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, totalDocs);

    // Genera la lista de páginas con elipses inteligentes (ej. [1, 2, 3, '...', 10])
    const pageNumbers = useMemo<(number | 'ellipsis')[]>(() => {
        if (totalPages <= 6) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (page <= 3) {
            return [1, 2, 3, 4, 'ellipsis', totalPages];
        }

        if (page >= totalPages - 2) {
            return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        //CASO CENTRAL
        return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages];
    }, [page, totalPages]);

    if (!paginationInfo || totalDocs === 0) {
        return null;
    }

    return (
        <section
            className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2 text-theme-sm system-text-theme-light-gray ${className}`}
            aria-label="Paginación"
        >
            {/* LADO IZQUIERDO: Resumen de resultados y selector de límite opcional */}
            <div className="flex items-center gap-3">
                {showResultsSummary && (
                    <p className="text-xs" >
                        Mostrando{" "}
                        <span className="font-semibold text-gray-dark dark:text-light-accent">
                            {startItem}
                        </span>{" "}
                        al{" "}
                        <span className="font-semibold text-gray-dark dark:text-light-accent">
                            {endItem}
                        </span>{" "}
                        de{" "}
                        <span className="font-semibold text-gray-dark dark:text-light-accent">
                            {totalDocs}
                        </span>{" "}
                        resultados
                    </p>
                )}

                {onLimitChange && (
                    <div className="flex items-center gap-1.5 pl-3 border-l border-gray/20 dark:border-gray/40">
                        <span className="text-theme-xs">Por pág:</span>
                        <select
                            value={limit}
                            onChange={(e) => {
                                onLimitChange(Number(e.target.value));
                                onPageChange(1); // Reiniciar a la página 1 al cambiar el límite
                            }}
                            className="px-2 py-1 text-theme-xs rounded-lg system-generic-border system-bg-theme-light-dark text-gray-dark dark:text-gray-light focus:outline-none focus:border-brand"
                        >
                            {limitOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* LADO DERECHO: Botones de navegación y números */}
            {totalPages > 1 && (
                <div className="flex items-center gap-1">
                    {
                        page > 1 && (
                            <>
                                {/* Primera página */}
                                <button
                                    type="button"
                                    onClick={() => onPageChange(1)}
                                    disabled={!hasPrevPage}
                                    title="Primera página"
                                    className="flex size-6 items-center justify-center rounded-lg system-generic-border system-bg-theme-light-dark transition-colors hover:bg-brand/10 hover:text-brand disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    <ChevronsLeft className="size-4" />
                                </button>

                                {/* Página anterior */}
                                <button
                                    type="button"
                                    onClick={() => onPageChange(page - 1)}
                                    disabled={!hasPrevPage}
                                    title="Página anterior"
                                    className="flex size-6 items-center justify-center rounded-lg system-generic-border system-bg-theme-light-dark transition-colors hover:bg-brand/10 hover:text-brand disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>
                            </>
                        )

                    }

                    {/* Botones numéricos */}
                    <div className="flex items-center gap-1 mx-1">
                        {pageNumbers.map((p, idx) => {
                            if (p === 'ellipsis') {
                                return (
                                    <span
                                        key={`ellipsis-${idx}`}
                                        className="size-4 flex items-center justify-center text-gray/50 select-none text-theme-xs"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            const isActive = p === page;

                            return (
                                <button
                                    key={`page-${p}`}
                                    type="button"
                                    onClick={() => onPageChange(p)}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`size-6 flex items-center justify-center rounded-lg text-theme-xs font-semibold transition-all ${isActive
                                        ? "bg-brand text-light dark:bg-brand-dark dark:text-light shadow-theme-xs"
                                        : "system-generic-border system-bg-theme-light-dark system-text-theme-light-gray hover:bg-brand/10 hover:text-brand dark:hover:bg-brand-dark/20"
                                        }`}
                                >
                                    {p}
                                </button>
                            );
                        })}
                    </div>

                    {
                        hasNextPage && (
                            <>
                                {/* Página siguiente */}
                                <button
                                    type="button"
                                    onClick={() => onPageChange(page + 1)}
                                    disabled={!hasNextPage}
                                    title="Página siguiente"
                                    className="flex size-6 items-center justify-center rounded-lg system-generic-border system-bg-theme-light-dark transition-colors hover:bg-brand/10 hover:text-brand disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    <ChevronRight className="size-4" />
                                </button>

                                {/* Última página */}
                                <button
                                    type="button"
                                    onClick={() => onPageChange(totalPages)}
                                    disabled={!hasNextPage}
                                    title="Última página"
                                    className="flex size-6 items-center justify-center rounded-lg system-generic-border system-bg-theme-light-dark transition-colors hover:bg-brand/10 hover:text-brand disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    <ChevronsRight className="size-4" />
                                </button>

                            </>
                        )
                    }
                </div>
            )}
        </section>
    );
}
