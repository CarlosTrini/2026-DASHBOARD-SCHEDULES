import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Dashboard" />

      {/* Tarjeta de Bienvenida */}
      <div className="rounded-2xl border border-gray-light bg-light-accent p-6 shadow-theme-xs dark:border-gray/30 dark:bg-gray-dark">
        <h1 className="text-xl font-bold text-gray-dark dark:text-light mb-2">
          ¡Bienvenido a tu Dashboard!
        </h1>
        <p className="text-sm text-gray dark:text-gray-light max-w-2xl leading-relaxed">
          Esta es una plantilla limpia y modular basada en Next.js App Router, Tailwind CSS v4 y arquitectura por features. Lista para comenzar a desarrollar.
        </p>

        {/* Guía rápida */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-light/60 bg-light/60 p-4 dark:border-gray/20 dark:bg-black-light/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand font-semibold text-xs dark:bg-brand/20 dark:text-brand-light">
                1
              </span>
              <h3 className="text-sm font-semibold text-gray-dark dark:text-light">
                Crea tus Features
              </h3>
            </div>
            <p className="text-xs text-gray dark:text-gray-light">
              Organiza tus componentes, hooks y servicios dentro del directorio src/features.
            </p>
          </div>

          <div className="rounded-xl border border-gray-light/60 bg-light/60 p-4 dark:border-gray/20 dark:bg-black-light/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand font-semibold text-xs dark:bg-brand/20 dark:text-brand-light">
                2
              </span>
              <h3 className="text-sm font-semibold text-gray-dark dark:text-light">
                Agrega Rutas
              </h3>
            </div>
            <p className="text-xs text-gray dark:text-gray-light">
              Crea nuevas páginas dentro de src/app/ integradas al layout del dashboard.
            </p>
          </div>

          <div className="rounded-xl border border-gray-light/60 bg-light/60 p-4 dark:border-gray/20 dark:bg-black-light/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand font-semibold text-xs dark:bg-brand/20 dark:text-brand-light">
                3
              </span>
              <h3 className="text-sm font-semibold text-gray-dark dark:text-light">
                Configura Navegación
              </h3>
            </div>
            <p className="text-xs text-gray dark:text-gray-light">
              Edita la lista de enlaces en src/layout/AppSidebar.tsx para adaptarla a tu proyecto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
