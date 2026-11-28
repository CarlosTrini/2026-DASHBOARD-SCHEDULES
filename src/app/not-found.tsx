"use client";

// REACT & NEXT
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// COMPONENTS
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

// CONSTANTS & ICONS
import { ROUTES_LINKS } from "@/utils/constants";
import {
  ArrowLeft,
  LayoutDashboard,
  Calendar,
  Users,
  Compass,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-light dark:bg-black text-gray-dark dark:text-light overflow-hidden transition-colors select-none">
      {/* AMBIENT GLOW EFFECTS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-87.5 bg-brand/15 dark:bg-brand/20 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-light/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* TARJETA PRINCIPAL GLASSMORPHISM */}
      <main className="relative z-10 w-full max-w-2xl bg-white/90 dark:bg-[#121620]/90 backdrop-blur-2xl border border-gray/15 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 text-center ring-1 ring-black/5 dark:ring-white/5">

        {/* BADGE DE ESTADO */}
        <div className="flex justify-center mb-4">
          <Badge
            color="error"
            variant="solid"
            size="lg"
            dot={true}
            pulse={true}
          >
            Error 404 • Ruta no encontrada
          </Badge>
        </div>

        {/* TÍTULOS */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-dark dark:text-white">
          ¡Ups! Parece que te has perdido
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray dark:text-gray-light max-w-lg mx-auto italic">
          La página a la que intentas acceder no existe, fue reubicada o la dirección ingresada no es correcta.
        </p>

        {/* ILUSTRACIÓN */}
        <div className="relative mx-auto my-6 w-full max-w-md overflow-hidden rounded-2xl border border-gray/10 dark:border-white/10 bg-light-accent/60 dark:bg-white/2 p-4 shadow-xl">
          <Image
            src="/images/not-found.png"
            alt="Ilustración 404 página no encontrada"
            width={480}
            height={240}
            priority
            className="mx-auto rounded-xl object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* ACCIONES PRINCIPALES */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Button
            onClick={() => router.push(ROUTES_LINKS.admin_route)}
            variant="solid"
            typeButton="primary"
            size="md"
            startIcon={<LayoutDashboard className="w-4 h-4" />}
            className="w-full sm:w-auto cursor-pointer"
          >
            Ir al Dashboard
          </Button>

          <Button
            onClick={() => router.back()}
            variant="outline"
            typeButton="light"
            size="md"
            startIcon={<ArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto cursor-pointer"
          >
            Volver a la página anterior
          </Button>
        </div>

        {/* ENLACES RÁPIDOS SUGERIDOS */}
        <div className="mt-8 pt-6 border-t border-gray/10 dark:border-white/10">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray dark:text-gray-light font-medium mb-3">
            <Compass className="w-3.5 h-3.5 text-brand" />
            <span>O puedes explorar estas secciones frecuentes:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <Link
              href={ROUTES_LINKS.schedules_route}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-light dark:bg-white/4 border border-gray/15 dark:border-white/10 text-gray-dark dark:text-light-accent hover:border-brand hover:text-brand transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-brand" />
              <span>Agenda y Citas</span>
            </Link>

            <Link
              href={ROUTES_LINKS.clients_route}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-light dark:bg-white/4 border border-gray/15 dark:border-white/10 text-gray-dark dark:text-light-accent hover:border-brand hover:text-brand transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-brand" />
              <span>Clientes/Pacientes</span>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
