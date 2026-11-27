import Image from 'next/image';
import { ReactNode } from 'react';

interface Props<T = unknown> {
    id: string;
    children: ReactNode;
    isLoading: boolean;
    isError: boolean | Error | null;
    data?: T | null;
    errorMsg?: string;
    noDataPlaceholder?: ReactNode;
    customLoader?: ReactNode; // ✅ Permite meter el Skeleton de las Metrics
    loadingClassName?: string;
    errorClassName?: string;
    onRetry?: () => void;     // ✅ Botón opcional para reintentar con TanStack Query
    className?: string;       // ✅ Permite heredar clases flex y altura
}

export default function Fallback<T>({
    id,
    children,
    isError,
    isLoading,
    data,
    errorMsg,
    customLoader,
    onRetry,
    loadingClassName = "min-h-20 w-full",
    errorClassName = "min-h-24 w-full p-4",
    noDataPlaceholder,
    className = ""
}: Props<T>) {

    // Evalúa si no hay datos de forma segura (sin confundir 0 o false con vacío)
    const isNoData = () => {
        if (data === undefined || data === null) return true;
        if (Array.isArray(data) && data.length === 0) return true;
        if (typeof data === 'object' && Object.keys(data).length === 0) return true;
        return false;
    };

    return (
        <section id={id} className={`flex-1 min-h-0 flex flex-col ${className}`}>
            {/* 1. ESTADO DE CARGA */}
            {isLoading && !isError && (
                customLoader ? (
                    customLoader
                ) : (
                    <div className={`${loadingClassName} flex items-center justify-center`}>
                        <div className="loader"></div>
                    </div>
                )
            )}

            {/* 2. ESTADO DE ERROR */}
            {!isLoading && isError && (
                <div className={`${errorClassName} flex flex-col items-center justify-center gap-2 text-center`}>
                    <figure className="size-10 overflow-hidden">
                        <Image
                            src="/images/error.jpg"
                            alt="Error"
                            className="object-cover rounded-full"
                            width={100}
                            height={100}
                        />
                    </figure>
                    <h2 className="text-theme-sm font-semibold text-gray-dark dark:text-light-accent">
                        {errorMsg || "No se pudo cargar la información"}
                    </h2>
                    {onRetry && (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="mt-1 text-xs text-brand hover:underline font-medium"
                        >
                            Reintentar
                        </button>
                    )}
                </div>
            )}

            {/* 3. CON DATOS EXITOSOS */}
            {!isLoading && !isError && !isNoData() && children}

            {/* 4. SIN DATOS / VACÍO */}
            {!isLoading && !isError && isNoData() && noDataPlaceholder}
        </section>
    );
}
