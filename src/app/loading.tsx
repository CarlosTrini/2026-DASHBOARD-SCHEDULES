import React from "react";

interface Props {
    showSkeleton?: boolean;
}

export default function Loading({ showSkeleton = true }: Props) {
    return (
        <div className="relative flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-center overflow-hidden py-8">
            {
                showSkeleton && (<>
                    {/* Skeletons de fondo simulando una estructura genérica de pantalla (universal para cualquier sección) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 flex flex-col gap-6 opacity-65 dark:opacity-25 select-none"
                    >
                        {/* Cabecera genérica de página (Título, subtítulo y botón de acción) */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="h-7 w-48 animate-pulse rounded-lg bg-gray/20 dark:bg-gray/30" />
                                <div className="h-4 w-72 animate-pulse rounded-md bg-gray/15 dark:bg-gray/20" />
                            </div>
                            <div className="h-9 w-28 animate-pulse rounded-xl bg-gray/15 dark:bg-gray/25" />
                        </div>

                        {/* Contenedor principal genérico (abstracto, adaptable a formularios, listas, tablas o vistas generales) */}
                        <div className="flex flex-1 flex-col gap-5 rounded-2xl border border-gray/15 bg-light-accent p-6 shadow-theme-xs dark:border-gray/20 dark:bg-black-light">
                            <div className="flex items-center justify-between border-b border-gray/10 pb-4 dark:border-gray/20">
                                <div className="h-5 w-44 animate-pulse rounded-md bg-gray/20 dark:bg-gray/30" />
                                <div className="h-5 w-20 animate-pulse rounded-md bg-gray/15 dark:bg-gray/20" />
                            </div>

                            {/* Líneas y bloques abstractos universales */}
                            <div className="space-y-4 pt-1">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="h-10 animate-pulse rounded-xl bg-gray/10 dark:bg-gray/20" />
                                    <div className="h-10 animate-pulse rounded-xl bg-gray/10 dark:bg-gray/20" />
                                </div>
                                <div className="h-4 w-full animate-pulse rounded bg-gray/15 dark:bg-gray/20" />
                                <div className="h-4 w-11/12 animate-pulse rounded bg-gray/15 dark:bg-gray/20" />
                                <div className="h-4 w-4/5 animate-pulse rounded bg-gray/15 dark:bg-gray/20" />
                                <div className="h-4 w-3/4 animate-pulse rounded bg-gray/15 dark:bg-gray/20" />
                                <div className="h-32 w-full animate-pulse rounded-2xl bg-gray/10 dark:bg-gray/20" />
                            </div>
                        </div>
                    </div>
                </>
                )
            }
            {/* Tarjeta Central con presencia sólida, relieve y glow */}
            <div className="relative z-10 flex flex-col items-center gap-4 rounded-3xl border border-gray/20 bg-light-accent px-9 py-7 shadow-theme-xl dark:border-gray/30 dark:bg-gray-dark/95 dark:shadow-black/50">
                {/* Glow ambiental con los tonos Brand del tema */}
                <div className="absolute -inset-2 -z-10 rounded-3xl bg-linear-to-r from-brand/25 via-blue-light/20 to-brand/25 blur-xl opacity-90 dark:opacity-75" />

                {/* Spinner animado */}
                <div className="relative flex items-center justify-center">
                    <span className="loader scale-90" />
                </div>

                {/* Mensaje de Carga */}
                <div className="flex flex-col items-center text-center">
                    <h4 className="text-sm font-semibold tracking-wide text-gray-dark dark:text-light-accent">
                        Cargando contenido
                    </h4>
                    <p className="mt-0.5 text-xs text-gray dark:text-gray-light/70">
                        Preparando la información...
                    </p>
                </div>

                {/* Barra de progreso indeterminada animada */}
                <div className="relative h-1.5 w-40 overflow-hidden rounded-full bg-gray/15 dark:bg-gray/30">
                    <div className="absolute inset-y-0 w-2/5 rounded-full bg-linear-to-r from-brand to-blue-light animate-indeterminate shadow-xs shadow-brand/40" />
                </div>
            </div>
        </div>

    );
}
