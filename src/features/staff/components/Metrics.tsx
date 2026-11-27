'use client';
import { Activity, User2Icon } from 'lucide-react';
import { memo } from "react";
import { useQuery } from '@tanstack/react-query';
import { StaffActionService } from '../services';
import Fallback from '@/components/fallbackQuery/Fallback';
import Skeleton from '@/components/skeleton/Skeleton';

function Metrics() {


    // QUERY
    const { data: staffMetrics, isLoading, isError } = useQuery({
        queryKey: ['staff-metrics'],
        queryFn: () => StaffActionService.getStaffMetrics(),
        placeholderData: (previousData) => previousData, // ✅ ESTA LÍNEA ELIMINA EL FLASHAZO
    });


    // RENDERS
    const LoaderMetrics = () => (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-5' aria-hidden={true}>
            <Skeleton type='container' className=" flex flex-col gap-2">
                <Skeleton type='text' className='w-[25%] h-5' />
                <Skeleton type='text' className='w-full h-5' />
            </Skeleton>
            <Skeleton type='container' className=" flex flex-col gap-2">
                <Skeleton type='text' className='w-[25%] h-5' />
                <Skeleton type='text' className='w-full h-5' />
            </Skeleton>
        </div>
    );

    return (

        <Fallback
            id='staff-metrics-fallback'
            isLoading={isLoading}
            isError={isError}
            data={staffMetrics}
            customLoader={<LoaderMetrics />}
            noDataPlaceholder={<div><p className='text-center text-error italic font-light'>No se encontraron métricas</p></div>}
        >

            <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {/* CARD 1: TOTAL DE PERSONAL */}
                <article className="relative flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl system-generic-border-shadow system-bg-theme-light-dark overflow-hidden transition-all hover:shadow-theme-md">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="relative flex size-13 shrink-0 items-center justify-center rounded-xl bg-brand/10 dark:bg-brand-dark/30 text-brand dark:text-brand-light border border-brand/20">
                            <User2Icon className="size-6 stroke-2" />
                            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-brand border-2 border-light-accent dark:border-gray-dark" />
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span className="text-theme-xs font-semibold uppercase tracking-wider text-brand dark:text-brand-light truncate">
                                Personal registrado
                            </span>
                            <h3 className="text-theme-sm font-medium system-text-theme-light-gray truncate">
                                Total de empleados
                            </h3>
                            <p className="text-theme-xs text-gray/60 dark:text-gray-light/50 truncate mt-0.5">
                                {/* {currentHeadquarter?.name || "Sede actual"} */}
                                Sede actual
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 pl-4 border-l border-gray/15 dark:border-gray/30">
                        <span className="text-title-sm font-bold text-gray-dark dark:text-light-accent">
                            {staffMetrics?.total}
                        </span>
                        <span className="text-theme-xs font-medium text-gray/70 dark:text-gray-light/60">
                            Activos: {staffMetrics?.status?.active}
                        </span>
                    </div>
                </article>

                {/* CARD 2: EN CONSULTA Y OPERATIVIDAD (%) */}
                <article className="flex flex-col justify-between gap-3 p-4 sm:p-5 rounded-2xl system-generic-border-shadow system-bg-theme-light-dark transition-all hover:shadow-theme-md">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-light/10 dark:bg-blue-light-dark/25 text-blue-light dark:text-blue-light-light border border-blue-light/20">
                                <Activity className="size-5 stroke-2" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-theme-sm font-semibold text-gray-dark dark:text-light-accent truncate">
                                    Personal activo
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-light/10 dark:bg-blue-light-dark/20 border border-blue-light/30 text-blue-light-dark dark:text-blue-light-light">
                                <span className="text-theme-sm font-bold">{staffMetrics?.staffActive?.percentaje}%</span>
                                <span className="text-theme-xs font-medium">
                                    ({staffMetrics?.status?.active}/{staffMetrics?.total})
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Barra de progreso de operatividad */}
                    <div className="w-full h-2.5 rounded-full bg-gray-light dark:bg-gray/60 overflow-hidden flex">
                        <div
                            style={{ width: `${staffMetrics?.staffActive?.percentaje}%` }}
                            className="h-full bg-blue-light transition-all duration-500 rounded-full"
                        />
                    </div>
                </article>
            </section>
        </Fallback>
    );
} export default memo(Metrics);