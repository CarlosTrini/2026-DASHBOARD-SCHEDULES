# Next.js Admin Dashboard Template

Plantilla limpia, moderna y modular para paneles de administración y dashboards construida con **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, y una arquitectura orientada a **Features**.

---

## 🚀 Características Principales

- **Next.js (App Router)**: Enrutamiento directo y moderno en `src/app/` (sin i18n, 100% en español).
- **Prevención de FOUC**: Script inline en `<head>` que previene el destello en modo oscuro al recargar.
- **Arquitectura Basada en Features**: Código escalable y modular organizado por dominio de negocio en `src/features/`.
- **Layout de Dashboard Completo**:
  - **AppSidebar**: Menú lateral colapsable, animaciones fluidas, submenús desplegables, expansión por hover en modo reducido y drawer adaptable para móviles.
  - **AppHeader**: Barra superior fija con botón de alternancia del sidebar, acceso directo a búsqueda (`Ctrl + K` / `⌘K`), alternador de tema claro/oscuro y menú de usuario.
  - **Backdrop**: Capa de oscurecimiento interactiva para dispositivos móviles.
- **Contextos y Hooks**:
  - `useSidebar()` (`SidebarContext`): Control total del estado del sidebar (expandido, colapsado, hover y visibilidad móvil).
  - `useTheme()` (`ThemeContext`): Soporte nativo para modo oscuro y claro sin parpadeo.
  - TanStack React Query integrado en `TankStackProvider`.
- **Iconografía 100% Lucide (`lucide-react`)**: Todos los iconos del sistema, menús y formularios utilizan `lucide-react` para una apariencia moderna, unificada y ligera.
- **Tailwind CSS v4**: Configuración optimizada con variables CSS temáticas en `globals.css`.

---

## 📁 Estructura del Proyecto

```text
├── public/                     # Archivos estáticos e imágenes públicas
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # RootLayout (Providers + Shell del Dashboard)
│   │   ├── not-found.tsx       # Página de error 404
│   │   ├── page.tsx            # Página de inicio del Dashboard
│   │   ├── favicon.ico
│   │   └── globals.css         # Estilos globales y configuración Tailwind CSS v4
│   │
│   ├── components/             # Componentes transversales y reutilizables
│   │   ├── common/             # Componentes comunes (Breadcrumbs, Toggler de tema, etc.)
│   │   ├── form/               # Componentes de formulario (Input, Select, Switch, etc.)
│   │   ├── header/             # Componentes del header (UserDropdown, NotificationDropdown)
│   │   └── ui/                 # Primitivas UI (Button, Modal, Dropdown, Badge, etc.)
│   │
│   ├── context/                # Contextos de React
│   │   ├── SidebarContext.tsx  # Estado del sidebar (colapsado, móvil, hover)
│   │   ├── ThemeContext.tsx    # Gestión del modo claro / oscuro
│   │   └── tankStackContext.tsx # Proveedor de TanStack React Query
│   │
│   ├── features/               # Módulos y funcionalidades de la aplicación
│   │   └── .gitkeep            # Estructura modular por features (ver guía abajo)
│   │
│   ├── hooks/                  # Custom hooks globales
│   │   ├── useClickOutside.ts
│   │   ├── useGoBack.ts
│   │   ├── useIsMobile.tsx
│   │   ├── usePagination.ts
│   │   └── ...
│   │
│   ├── layout/                 # Cascarón estructural del Dashboard
│   │   ├── AppHeader.tsx       # Header superior
│   │   ├── AppSidebar.tsx      # Barra de navegación lateral
│   │   ├── Backdrop.tsx        # Fondo oscuro para drawer móvil
│   │   └── DashboardLayout.tsx # Contenedor principal responsive
│   │
│   ├── lib/                    # Clientes de APIs y librerías
│   │   ├── api/                # Utilidades de API (paginación, etc.)
│   │   ├── axios.ts            # Cliente HTTP Axios configurado
│   │   └── mongodb.ts          # Conexión a MongoDB (opcional)
│   │
│   ├── services/               # Servicios de API compartidos
│   ├── store/                  # Stores globales con Zustand (userStore.ts)
│   ├── types/                  # Definiciones de tipos TypeScript globales (dataTypes.ts)
│   └── utils/                  # Funciones utilitarias (cn, etc.)
│
├── next.config.ts              # Configuración de Next.js
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración de TypeScript
└── .env.example                # Variables de entorno de referencia
```

---

## 🧩 Guía de Arquitectura por Features

Esta plantilla promueve la separación por dominios en `src/features/`. Cada feature encapsula su lógica, interfaz y servicios:

```text
src/features/
└── [nombre-de-la-feature]/
    ├── components/             # Componentes específicos de esta feature
    ├── hooks/                  # Custom hooks específicos
    ├── services/               # Llamadas a API o lógica de integración
    └── types/                  # Tipos e interfaces específicos
```

### Ejemplo de uso:
1. Crea la carpeta de tu funcionalidad: `src/features/users/`
2. Define los tipos en `src/features/users/types/index.ts`
3. Agrega servicios en `src/features/users/services/userService.ts`
4. Crea tus componentes en `src/features/users/components/UserTable.tsx`
5. Conéctalo a la vista en `src/app/users/page.tsx`

---

## 🧭 Configuración de la Navegación (Sidebar)

Para agregar o modificar elementos en el menú lateral, edita el arreglo `navigationItems` en [AppSidebar.tsx](file:///c:/Users/RAM/Desktop/Proyectos/templates/NEXT/nextjs-admin-dashboard%20-%20template/src/layout/AppSidebar.tsx):

```tsx
const navigationItems: SidebarNavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: "/",
  },
  {
    key: "features",
    label: "Funcionalidades",
    icon: <Layers className="h-5 w-5" />,
    subItems: [
      { key: "overview", label: "Visión General", path: "/overview" },
      { key: "reports", label: "Reportes", path: "/reports" },
    ],
  },
  {
    key: "settings",
    label: "Configuración",
    icon: <Settings className="h-5 w-5" />,
    path: "/settings",
  },
];
```

---

## 🛠️ Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start
```
