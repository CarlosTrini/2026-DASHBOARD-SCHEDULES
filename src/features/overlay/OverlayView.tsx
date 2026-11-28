'use client';

// REACT & NEXT
import { useState } from "react";
import { useRouter } from "next/navigation";

// ZUSTAND
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import { useUserStore } from "@/store/useUserStore";

// TANSTACK QUERY
import { useQuery } from '@tanstack/react-query';
// SERVICIOS
import { HeadquartersActionService } from "../headquarters/services";

// TYPES
import type { Headquarters } from "@/types/headquarters";

// COMPONENTS
import Badge from "@/components/ui/badge/Badge";
import Avatar from "@/components/ui/avatar/Avatar";
import AvatarText from "@/components/ui/avatar/AvatarText";

// ICONS
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    CheckCircle2,
    LogOut,
    Sparkles,
    Loader2,
} from "lucide-react";
import { ROUTES_LINKS } from "@/utils/constants";
import { deleteCookieToken } from "@/utils/cookieActionsToken";

export default function OverlayView() {


    // ROUTER
    const Navigate = useRouter();

    // ZUSTAND STORES
    const { allHeadquarters, setCurrentHeadquarter, currentHeadquarter, clearHeadquarter } = useHeadquarterStore();
    const { userInfo, userRole, clearAllSession } = useUserStore();

    // LOCAL STATE
    const [selectedHqId, setSelectedHqId] = useState<string | null>(null);

    // Fallback de IDs si recargan la página directamente
    const hqIds = (allHeadquarters && allHeadquarters.length > 0)
        ? allHeadquarters
        : (userInfo?.idHeadquarter || []);

    // FETCH SEDES
    const {
        data: dataHq,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['headquarterbyid', hqIds],
        queryFn: () => {
            return Promise.all(
                hqIds.map(idHq => HeadquartersActionService.getHqsById(idHq))
            );
        },
        // enabled: hqIds.length > 0,
    });

    // HANDLER SELECCIÓN DE SEDE
    const handleSelectHeadquarter = (headquarter: Headquarters) => {
        setSelectedHqId(headquarter.id);
        setCurrentHeadquarter(headquarter);

        // Pequeño delay de 250ms para feedback visual fluido
        setTimeout(() => {
            Navigate.push('/admin');
        }, 250);
    };

    // Evalúa si no hay datos de forma segura (sin confundir 0 o false con vacío)
    const isNoData = (dataHq: Headquarters[] | undefined) => {
        if (dataHq === undefined || dataHq === null) return true;
        if (Array.isArray(dataHq) && dataHq.length === 0) return true;
        if (typeof dataHq === 'object' && Object.keys(dataHq).length === 0) return true;
        return false;
    };

    // HANDLER LOGOUT
    const handleLogout = () => {
        clearAllSession();
        clearHeadquarter();
        deleteCookieToken();
        Navigate.push(ROUTES_LINKS.signin_route);
    };

    const userName = userInfo?.name ? `${userInfo.name} ${userInfo?.lastName || ''}`.trim() : 'Colaborador';

    return (
        <div className="fixed inset-0 z-99999 overflow-y-auto bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
            {/* AMBIENT GLOW EFFECTS */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-87.5 bg-brand/20 blur-[130px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-75 h-75 bg-brand-light/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* CONTENEDOR PRINCIPAL GLASSMORPHISM */}
            <div className="relative z-10 w-full max-w-3xl bg-white/95 dark:bg-[#121620]/95 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 my-auto ring-1 ring-black/5 dark:ring-white/5 transition-all">

                {/* HEADER / USER BAR */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray/10 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        {userInfo?.image ? (
                            <Avatar src={userInfo.image} alt={userName} size="small" />
                        ) : (
                            <AvatarText name={userName} size="small" />
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-dark dark:text-white">
                                    {userName}
                                </span>
                                <Badge
                                    size="sm"
                                    color={userRole === 'administrator' ? 'primary' : userRole === 'receptionist' ? 'info' : 'success'}
                                    variant="light"
                                    dot={false}
                                >
                                    {userRole === 'administrator' ? 'Administrador' : userRole === 'receptionist' ? 'Recepcionista' : 'Empleado'}
                                </Badge>
                            </div>
                            <p className="text-xs text-gray dark:text-gray-light">
                                {userInfo?.email || 'Sesión activa'}
                            </p>
                        </div>
                    </div>

                    <Badge
                        size="md"
                        color="primary"
                        variant="light"
                        className="font-medium"
                    >
                        {dataHq?.length || hqIds.length} {(dataHq?.length || hqIds.length) === 1 ? 'Sede asignada' : 'Sedes asignadas'}
                    </Badge>
                </div>

                {/* TÍTULO PRINCIPAL */}
                <div className="mt-6 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-light text-xs font-semibold mb-3">
                        <Building2 className="w-4 h-4" />
                        <span>Administración de citas</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-dark dark:text-white tracking-tight">
                        Selecciona la Sede de Trabajo
                    </h1>
                    <p className="mt-1.5 text-sm text-gray dark:text-gray-light max-w-xl">
                        Tienes acceso a múltiples sedes. Elige la sucursal en la que deseas operar hoy para consultar citas, horarios y pacientes.
                    </p>
                </div>

                {/* GRID DE SEDES / ESTADO DE CARGA */}
                <div className="my-6 sm:my-8">
                    {/* LOADING */}
                    {
                        isLoading && !isError
                        && (
                            // SKELETON LOADERS
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[1, 2].map((n) => (
                                        <div
                                            key={n}
                                            className="p-5 rounded-2xl border border-gray/15 dark:border-white/10 bg-light-accent/50 dark:bg-white/2 animate-pulse space-y-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gray/20 dark:bg-gray/30" />
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-gray/20 dark:bg-gray/30 rounded w-3/4" />
                                                    <div className="h-3 bg-gray/15 dark:bg-gray/25 rounded w-1/2" />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5 pt-2">
                                                <div className="h-3 bg-gray/15 dark:bg-gray/25 rounded w-full" />
                                                <div className="h-3 bg-gray/15 dark:bg-gray/25 rounded w-2/3" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="loader"></div>
                            </>
                        )
                    }


                    {/* 2. ESTADO DE ERROR */}
                    {!isLoading && isError && (
                        <div className="text-center py-8 px-4 rounded-2xl border border-error/20 bg-error/5">
                            <p className="text-sm font-semibold text-error mb-2">
                                Ocurrió un error al cargar tus sedes asignadas.
                            </p>
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="text-xs font-bold text-brand hover:underline cursor-pointer"
                            >
                                Reintentar cargar sedes
                            </button>
                        </div>
                    )
                    }

                    {/* 3. CON DATOS EXITOSOS */}
                    {
                        !isLoading && !isError && !isNoData(dataHq) && (
                            // TARJETAS DE SEDES
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                {dataHq && dataHq.map((headquarter) => {
                                    const isCurrent = currentHeadquarter?.id === headquarter.id;
                                    const isSelected = selectedHqId === headquarter.id;

                                    return (
                                        <button
                                            key={headquarter.id}
                                            type="button"
                                            disabled={selectedHqId !== null}
                                            onClick={() => handleSelectHeadquarter(headquarter)}
                                            className={`group text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between ${isSelected
                                                ? 'bg-brand/10 dark:bg-brand/15 border-brand ring-2 ring-brand shadow-lg scale-[1.01]'
                                                : isCurrent
                                                    ? 'bg-brand/4 dark:bg-brand/8 border-brand/50 hover:border-brand hover:shadow-xl hover:-translate-y-1'
                                                    : 'bg-light-accent/60 dark:bg-white/2 border-gray/15 dark:border-white/10 hover:border-brand/70 hover:bg-white dark:hover:bg-white/4 hover:shadow-xl hover:-translate-y-1'
                                                }`}
                                        >
                                            {/* HEADER TARJETA: ICONO + NOMBRE + BADGE */}
                                            <div>
                                                <div className="flex items-start justify-between gap-3 mb-3">
                                                    <div className="p-3 rounded-xl bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-light group-hover:scale-105 group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                                        <Building2 className="w-5 h-5" />
                                                    </div>

                                                    {isSelected ? (
                                                        <Badge color="primary" size="sm" variant="solid">
                                                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                                            Entrando...
                                                        </Badge>
                                                    ) : isCurrent ? (
                                                        <Badge color="success" size="sm" variant="light" dot={true} pulse={true}>
                                                            Sede actual
                                                        </Badge>
                                                    ) : null}
                                                </div>

                                                <h3 className="text-base sm:text-lg font-bold text-gray-dark dark:text-white group-hover:text-brand transition-colors line-clamp-1">
                                                    {headquarter.name}
                                                </h3>

                                                {/* DETALLES DE DIRECCIÓN */}
                                                <div className="mt-3 space-y-1.5 text-xs text-gray dark:text-gray-light">
                                                    <div className="flex items-start gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-brand/70 dark:text-brand-light/70 shrink-0 mt-0.5" />
                                                        <span className="line-clamp-2">
                                                            {headquarter.street} {headquarter.number || ''}, {headquarter.city || ''} {headquarter.state ? `(${headquarter.state})` : ''}
                                                        </span>
                                                    </div>

                                                    {headquarter.phone && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Phone className="w-3.5 h-3.5 text-brand/70 dark:text-brand-light/70 shrink-0" />
                                                            <span>{headquarter.phone}</span>
                                                        </div>
                                                    )}

                                                    {headquarter.email && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Mail className="w-3.5 h-3.5 text-brand/70 dark:text-brand-light/70 shrink-0" />
                                                            <span className="truncate">{headquarter.email}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* ACTION CALLOUT EN LA PARTE INFERIOR */}
                                            <div className="mt-5 pt-3 border-t border-gray/10 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-brand dark:text-brand-light">
                                                <span>
                                                    {isSelected ? 'Cargando información...' : isCurrent ? 'Continuar en esta sede' : 'Ingresar a esta sede'}
                                                </span>
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )
                    }

                    {/* NO DATA */}
                    {
                        !isLoading && !isError && isNoData(dataHq) && (
                            <div className="text-center py-10 px-4">
                                <Building2 className="w-10 h-10 text-gray/40 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-gray-dark dark:text-white">
                                    No se encontraron sedes asociadas a tu cuenta.
                                </p>
                                <p className="text-xs text-gray dark:text-gray-light mt-1">
                                    Por favor contacta al administrador del sistema para que asigne tus sucursales.
                                </p>
                            </div>
                        )}
                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-gray/10 dark:border-white/10 text-xs text-gray dark:text-gray-light">
                    <div className="flex items-center gap-1.5 text-center sm:text-left">
                        <Sparkles className="w-4 h-4 text-brand shrink-0" />
                        <span className="pb-1 border-b border-brand-light">Podrás alternar de sede en cualquier momento desde el menú superior del panel. <br /> sin necesidad de reinicar sesión </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center gap-1.5 font-medium text-gray hover:text-error dark:text-gray-light dark:hover:text-error transition-colors cursor-pointer shrink-0"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
