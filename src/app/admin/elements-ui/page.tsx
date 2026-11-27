"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import { useModal } from "@/hooks/useModal";

// --- FORMS (src/components/form/*) ---
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Checkbox from "@/components/form/input/Checkbox";
import Radio from "@/components/form/input/Radio";
import RadioSm from "@/components/form/input/RadioSm";
import CopyInput from "@/components/form/input/CopyInput";
import FileInput from "@/components/form/input/FileInput";
import PhoneInput from "@/components/form/input/PhoneInput";
import Select from "@/components/form/select/Select";
import MultiSelect from "@/components/form/select/MultiSelect";
import DatePicker from "@/components/form/picker/date-picker";
import Switch from "@/components/form/switch/Switch";
import DropzoneComponent from "@/components/form/drops/DropZone";

// --- TABS (src/components/tabsPanel/*) ---
import TabsPanel from "@/components/tabsPanel/TabsPanel";

// --- UI (src/components/ui/*) ---
import Alert, { AlertProps } from "@/components/ui/alert/Alert";
import Avatar from "@/components/ui/avatar/Avatar";
import AvatarText from "@/components/ui/avatar/AvatarText";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import Collapse from "@/components/ui/collapse/Collapse";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import ResponsiveImage from "@/components/ui/images/ResponsiveImage";
import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Tooltip from "@/components/ui/tooltip/Tooltip";

// Icons
import {
  FileText,
  Layers,
  Sparkles,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  Send,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react";

export default function ElementsUiPage() {
  // State for interactive demos
  const [radioValue, setRadioValue] = useState<string>("pro");
  const [radioSmValue, setRadioSmValue] = useState<string>("opt1");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeAlert, setActiveAlert] = useState<AlertProps | null>(null);

  const {
    isOpen: isModalOpen,
    openModal,
    closeModal,
  } = useModal(false);

  // Countries for PhoneInput
  const phoneCountries = [
    { code: "US", label: "+1" },
    { code: "MX", label: "+52" },
    { code: "ES", label: "+34" },
    { code: "CO", label: "+57" },
    { code: "AR", label: "+54" },
  ];

  // Options for Select
  const selectOptions = [
    { value: "react", label: "React 19" },
    { value: "nextjs", label: "Next.js 16" },
    { value: "tailwind", label: "Tailwind CSS v4" },
    { value: "typescript", label: "TypeScript 5" },
  ];

  // Options for MultiSelect
  const multiSelectOptions = [
    { value: "frontend", text: "Frontend Development" },
    { value: "backend", text: "Backend Architecture" },
    { value: "uiux", text: "UI/UX Design Systems" },
    { value: "devops", text: "Cloud & DevOps" },
  ];

  // Data for TabsPanel
  const sampleTabs = [
    {
      id: "tab-info",
      label: "Visión General",
      content: (
        <div className="p-4 space-y-2">
          <h4 className="text-sm font-semibold text-gray-dark dark:text-light">
            Sistema de Pestañas Interactivo
          </h4>
          <p className="text-xs text-gray dark:text-gray-light leading-relaxed">
            TabsPanel permite cambiar de vistas sin recargar la página. Conserva el
            estado y renderiza contenido dinámico de forma optimizada.
          </p>
        </div>
      ),
    },
    {
      id: "tab-code",
      label: "Ejemplo de Código",
      content: (
        <div className="p-4">
          <pre className="rounded-lg bg-gray-dark p-3 text-xs text-light-accent font-mono overflow-x-auto dark:bg-black/50">
            {`<TabsPanel\n  tabsData={[\n    { id: "1", label: "Tab 1", content: <Content1 /> },\n    { id: "2", label: "Tab 2", content: <Content2 /> }\n  ]}\n/>`}
          </pre>
        </div>
      ),
    },
    {
      id: "tab-settings",
      label: "Ajustes",
      content: (
        <div className="p-4 space-y-3">
          <p className="text-xs text-gray dark:text-gray-light">
            Puedes configurar estados activos, bordes y estilos adicionales pasando className.
          </p>
          <Badge color="success" size="sm">
            Configuración Lista
          </Badge>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      <PageBreadcrumb pageTitle="Catálogo de Componentes (How to Use)" />

      {/* Hero Banner */}
      <div className="rounded-2xl border border-gray-light bg-light-accent p-6 shadow-theme-xs dark:border-gray/30 dark:bg-gray-dark">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <h1 className="text-lg font-bold text-gray-dark dark:text-light">
                Guía Visual y de Implementación
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray dark:text-gray-light leading-relaxed">
              Referencia completa de todos los componentes modulares incluidos en el template.
              Organizados por secciones funcionales: <strong>FORM</strong>, <strong>TABS</strong> y <strong>UI</strong>.
            </p>
          </div>

          {/* Quick Jump Pills */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <a
              href="#section-forms"
              className="rounded-lg border border-gray-light bg-light px-3 py-1.5 text-xs font-semibold text-gray-dark hover:border-brand hover:text-brand dark:border-gray/30 dark:bg-black/30 dark:text-light dark:hover:border-brand-light transition-colors"
            >
              # 1. FORMS
            </a>
            <a
              href="#section-tabs"
              className="rounded-lg border border-gray-light bg-light px-3 py-1.5 text-xs font-semibold text-gray-dark hover:border-brand hover:text-brand dark:border-gray/30 dark:bg-black/30 dark:text-light dark:hover:border-brand-light transition-colors"
            >
              # 2. TABS
            </a>
            <a
              href="#section-ui"
              className="rounded-lg border border-gray-light bg-light px-3 py-1.5 text-xs font-semibold text-gray-dark hover:border-brand hover:text-brand dark:border-gray/30 dark:bg-black/30 dark:text-light dark:hover:border-brand-light transition-colors"
            >
              # 3. UI
            </a>
          </div>
        </div>
      </div>

      {/* Alerta flotante disparada por botones */}
      {activeAlert && (
        <Alert
          variant={activeAlert.variant}
          title={activeAlert.title}
          message={activeAlert.message}
          onClose={() => setActiveAlert(null)}
          timer={4000}
        />
      )}

      {/* ========================================================= */}
      {/* SECCIÓN 1: FORM                                           */}
      {/* ========================================================= */}
      <section id="section-forms" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-2.5 border-b border-gray-light pb-3 dark:border-gray/30">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-light shadow-theme-xs">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-dark dark:text-light tracking-tight">
              1. Componentes de Formulario (src/components/form/*)
            </h2>
            <p className="text-xs text-gray dark:text-gray-light">
              Entradas de texto, selectores, controles de selección, carga de archivos y utilidades.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: InputField & Label */}
          <ComponentCard
            title="InputField & Label"
            desc="Campos de entrada estándar con soporte para estados (normal, error, success, disabled)."
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-default">Nombre Completo</Label>
                <InputField
                  id="input-default"
                  placeholder="Ej. Juan Pérez"
                  defaultValue="Alex Johnson"
                />
              </div>

              <div>
                <Label htmlFor="input-success">Correo Electrónico (Válido)</Label>
                <InputField
                  id="input-success"
                  placeholder="correo@ejemplo.com"
                  defaultValue="alex.johnson@empresa.com"
                  success
                  hint="Correo verificado correctamente"
                />
              </div>

              <div>
                <Label htmlFor="input-error">Usuario (Con Error)</Label>
                <InputField
                  id="input-error"
                  placeholder="Nombre de usuario"
                  defaultValue="admin"
                  error
                  hint="El nombre de usuario ya está en uso"
                />
              </div>

              <div>
                <Label htmlFor="input-disabled">Identificador de Cuenta (Deshabilitado)</Label>
                <InputField
                  id="input-disabled"
                  placeholder="ID de sistema"
                  defaultValue="USR-994821"
                  disabled
                />
              </div>
            </div>
          </ComponentCard>

          {/* Card: TextArea, CopyInput & PhoneInput */}
          <ComponentCard
            title="TextArea, CopyInput & PhoneInput"
            desc="Entradas especializadas para texto largo, copiado con un clic y números de teléfono internacionales."
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="textarea-example">Descripción o Comentarios</Label>
                <TextArea
                  id="textarea-example"
                  placeholder="Escribe detalles adicionales sobre el proyecto..."
                  rows={3}
                  defaultValue="Plantilla con diseño modular basada en Tailwind v4 y Next.js."
                />
              </div>

              <div>
                <Label>CopyInput (Copiar Token o URL)</Label>
                <CopyInput value="https://dashboard-template.pro/api/v1/webhook" />
              </div>

              <div>
                <Label>PhoneInput (Selector de País)</Label>
                <PhoneInput countries={phoneCountries} placeholder="(555) 123-4567" />
              </div>
            </div>
          </ComponentCard>

          {/* Card: Select & MultiSelect */}
          <ComponentCard
            title="Select & MultiSelect"
            desc="Selectores de opción única y múltiple con chips y búsqueda."
          >
            <div className="space-y-4">
              <div>
                <Label>Select (Opción Única con Limpieza)</Label>
                <Select
                  options={selectOptions}
                  defaultValue="nextjs"
                  canClear
                  placeholder="Selecciona un framework..."
                />
              </div>

              <div>
                <Label>MultiSelect (Selección Múltiple)</Label>
                <MultiSelect
                  label="Tecnologías"
                  options={multiSelectOptions}
                  defaultSelected={["frontend", "uiux"]}
                  placeholder="Elige una o más categorías..."
                />
              </div>
            </div>
          </ComponentCard>

          {/* Card: DatePicker, Switch & Checkbox */}
          <ComponentCard
            title="DatePicker, Switch, Checkbox & Radios"
            desc="Controles booleanos, selectores de fecha Flatpickr y botones de opción."
          >
            <div className="space-y-4">
              <div>
                <Label>DatePicker (Flatpickr)</Label>
                <DatePicker placeholder="Selecciona una fecha..." />
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <Label>Switch (Interruptores)</Label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Switch label="Notificaciones activas" defaultChecked />
                  <Switch label="Modo estricto" color="gray" />
                </div>
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <Label>Checkbox</Label>
                <div className="flex flex-col gap-2 mt-1">
                  <Checkbox id="chk-terms" label="Acepto los términos y políticas" defaultChecked />
                  <Checkbox id="chk-newsletter" label="Suscribirse al boletín semanal" />
                  <Checkbox id="chk-disabled" label="Opción deshabilitada" disabled defaultChecked />
                </div>
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <Label>Radio (Estándar y Small)</Label>
                <div className="space-y-2 mt-1">
                  <div className="flex items-center gap-4">
                    <Radio
                      id="radio-basic"
                      name="pricing-plan"
                      value="basic"
                      label="Básico"
                      checked={radioValue === "basic"}
                      onChange={setRadioValue}
                    />
                    <Radio
                      id="radio-pro"
                      name="pricing-plan"
                      value="pro"
                      label="Pro (Recomendado)"
                      checked={radioValue === "pro"}
                      onChange={setRadioValue}
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <RadioSm
                      id="rsm-1"
                      name="sm-group"
                      value="opt1"
                      label="Opción Compacta A"
                      checked={radioSmValue === "opt1"}
                      onChange={setRadioSmValue}
                    />
                    <RadioSm
                      id="rsm-2"
                      name="sm-group"
                      value="opt2"
                      label="Opción Compacta B"
                      checked={radioSmValue === "opt2"}
                      onChange={setRadioSmValue}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Card: FileInput & DropZone */}
          <div className="md:col-span-2">
            <ComponentCard
              title="FileInput & DropZone (Subida de Archivos)"
              desc="Entrada nativa estilizada y zona de arrastre drag & drop con previsualización."
            >
              <div className="space-y-6">
                <div>
                  <Label>FileInput (Input de archivo individual)</Label>
                  <FileInput size="md" />
                </div>

                <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                  <Label>DropZone (Arrastrar y Soltar con Modal Preview)</Label>
                  <DropzoneComponent />
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECCIÓN 2: TABS                                           */}
      {/* ========================================================= */}
      <section id="section-tabs" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-2.5 border-b border-gray-light pb-3 dark:border-gray/30">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-light shadow-theme-xs">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-dark dark:text-light tracking-tight">
              2. Panel de Pestañas (src/components/tabsPanel/*)
            </h2>
            <p className="text-xs text-gray dark:text-gray-light">
              Navegación por pestañas desacoplada con soporte de contenido dinámico.
            </p>
          </div>
        </div>

        <ComponentCard
          title="TabsPanel"
          desc="Componente para alternar entre diferentes vistas o secciones de contenido."
        >
          <div className="pt-2">
            <TabsPanel tabsData={sampleTabs} />
          </div>
        </ComponentCard>
      </section>

      {/* ========================================================= */}
      {/* SECCIÓN 3: UI                                             */}
      {/* ========================================================= */}
      <section id="section-ui" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-2.5 border-b border-gray-light pb-3 dark:border-gray/30">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-light shadow-theme-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-dark dark:text-light tracking-tight">
              3. Elementos de Interfaz de Usuario (src/components/ui/*)
            </h2>
            <p className="text-xs text-gray dark:text-gray-light">
              Botones, badges, alertas, avatares, modales, menús desplegables, tablas, acordeones e imágenes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Botones */}
          <ComponentCard
            title="Buttons (Botones)"
            desc="Variantes solid y outline en múltiples colores semánticos (typeButton), tamaño personalizado e iconos."
          >
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Colores Solid (typeButton)
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="solid" typeButton="primary" size="xs">Primary</Button>
                  <Button variant="solid" typeButton="secondary" size="xs">Secondary</Button>
                  <Button variant="solid" typeButton="success" size="xs">Success</Button>
                  <Button variant="solid" typeButton="warning" size="xs">Warning</Button>
                  <Button variant="solid" typeButton="error" size="xs">Error</Button>
                  <Button variant="solid" typeButton="info" size="xs">Info</Button>
                  <Button variant="solid" typeButton="light" size="xs">Light</Button>
                  <Button variant="solid" typeButton="dark" size="xs">Dark</Button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Colores Outline & Personalizado
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" typeButton="primary" size="xs">Outline Primary</Button>
                  <Button variant="outline" typeButton="secondary" size="xs">Outline Secondary</Button>
                  <Button variant="outline" typeButton="success" size="xs">Outline Success</Button>
                  <Button variant="outline" typeButton="warning" size="xs">Outline Warning</Button>
                  <Button variant="outline" typeButton="error" size="xs">Outline Error</Button>
                  <Button variant="outline" typeButton="info" size="xs">Outline Info</Button>
                  <Button
                    size="xs"
                    typeButton="bg-purple-600 hover:bg-purple-700 text-white shadow-theme-xs"
                  >
                    Custom Color (string)
                  </Button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Iconos y Estados
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    variant="solid"
                    typeButton="primary"
                    size="sm"
                    startIcon={<Plus className="h-4 w-4" />}
                  >
                    Con Icono
                  </Button>
                  <Button variant="solid" typeButton="primary" size="sm" disabled>
                    Deshabilitado
                  </Button>
                  <Button size="xs">xs</Button>
                  <Button size="sm">sm</Button>
                  <Button size="md">md</Button>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Card: Badges */}
          <ComponentCard
            title="Badges (Etiquetas y Estados)"
            desc="Variantes light y solid en diferentes colores semánticos."
          >
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Variante Light (Semántica)
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge color="primary" variant="light">Primary</Badge>
                  <Badge color="success" variant="light">Success</Badge>
                  <Badge color="warning" variant="light">Warning</Badge>
                  <Badge color="error" variant="light">Error</Badge>
                  <Badge color="info" variant="light">Info</Badge>
                  <Badge color="dark" variant="light">Dark</Badge>
                  <Badge color="success" variant="light" pulse>En vivo</Badge>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Variante Solid
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge color="primary" variant="solid">Primary</Badge>
                  <Badge color="success" variant="solid">Success</Badge>
                  <Badge color="warning" variant="solid">Warning</Badge>
                  <Badge color="error" variant="solid">Error</Badge>
                  <Badge color="info" variant="solid">Info</Badge>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Card: Avatares */}
          <ComponentCard
            title="Avatars & AvatarText"
            desc="Avatares con imagen, indicadores de estado y avatares basados en iniciales con colores generados."
          >
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Avatar con Imagen & Estado
                </span>
                <div className="flex items-center gap-3">
                  <Avatar
                    src="https://imgs.search.brave.com/wv8hxsCe54rj7_QMQ7Rg_FkU_lUqCO81L_GNaw6DdkA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY2hp/Y2tlbi1saXR0bGUt/YmFja2dyb3VuZC1t/Zzh3dGtmZGtmeGlj/OWtlLmpwZw"
                    size="small"
                    status="online"
                  />
                  <Avatar
                    src="https://imgs.search.brave.com/wv8hxsCe54rj7_QMQ7Rg_FkU_lUqCO81L_GNaw6DdkA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY2hp/Y2tlbi1saXR0bGUt/YmFja2dyb3VuZC1t/Zzh3dGtmZGtmeGlj/OWtlLmpwZw"
                    size="medium"
                    status="busy"
                  />
                  <Avatar
                    src="https://imgs.search.brave.com/wv8hxsCe54rj7_QMQ7Rg_FkU_lUqCO81L_GNaw6DdkA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY2hp/Y2tlbi1saXR0bGUt/YmFja2dyb3VuZC1t/Zzh3dGtmZGtmeGlj/OWtlLmpwZw"
                    size="large"
                    status="offline"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  AvatarText (Iniciales Automáticas)
                </span>
                <div className="flex items-center gap-2.5">
                  <AvatarText name="Alex Johnson" />
                  <AvatarText name="Beatriz Ramos" />
                  <AvatarText name="Carlos Mendoza" />
                  <AvatarText name="Diana Soto" />
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Card: Alertas Interactivas */}
          <ComponentCard
            title="Alerts (Notificaciones Toast)"
            desc="Notificaciones flotantes con temporizador, variantes visuales y cierre animado."
          >
            <div className="space-y-3">
              <p className="text-xs text-gray dark:text-gray-light">
                Haz clic en cualquier botón para disparar una alerta flotante en la esquina superior derecha:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    setActiveAlert({
                      variant: "success",
                      title: "¡Operación Exitosa!",
                      message: "Los cambios han sido guardados satisfactoriamente.",
                    })
                  }
                >
                  Success Toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setActiveAlert({
                      variant: "error",
                      title: "Error de Validación",
                      message: "No se pudo completar la solicitud. Revisa tus credenciales.",
                    })
                  }
                >
                  Error Toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setActiveAlert({
                      variant: "warning",
                      title: "Advertencia",
                      message: "Tu suscripción vencerá en los próximos 3 días.",
                    })
                  }
                >
                  Warning Toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setActiveAlert({
                      variant: "info",
                      title: "Información del Sistema",
                      message: "Hay una actualización programada para este fin de semana.",
                    })
                  }
                >
                  Info Toast
                </Button>
              </div>
            </div>
          </ComponentCard>

          {/* Card: Modal & Dropdown */}
          <ComponentCard
            title="Modal & Dropdown"
            desc="Diálogos modales accesibles y menús desplegables con cierre al hacer clic fuera."
          >
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Modal Accesible
                </span>
                <Button size="sm" onClick={openModal}>
                  Abrir Modal Interactivo
                </Button>

                <Modal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  title="Detalles de la Cuenta"
                >
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-gray dark:text-gray-light leading-relaxed">
                      Este modal bloquea el scroll de fondo y se puede cerrar con la tecla Escape,
                      haciendo clic en el botón de cerrar o en el backdrop.
                    </p>
                    <div className="flex justify-end gap-2 pt-3">
                      <Button variant="outline" size="sm" onClick={closeModal}>
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={closeModal}>
                        Guardar Cambios
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Dropdown & DropdownItem
                </span>
                <div className="relative inline-block">
                  <Button
                    size="sm"
                    variant="outline"
                    endIcon={<ChevronDown className="h-4 w-4" />}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="dropdown-toggle"
                  >
                    Acciones Rápidas
                  </Button>

                  <Dropdown
                    isOpen={dropdownOpen}
                    onClose={() => setDropdownOpen(false)}
                    className="w-48 top-full mt-2"
                  >
                    <DropdownItem onClick={() => setDropdownOpen(false)}>
                      Ver Perfil
                    </DropdownItem>
                    <DropdownItem onClick={() => setDropdownOpen(false)}>
                      Editar Preferencias
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setDropdownOpen(false)}
                      className="text-error hover:bg-error/10 hover:text-error"
                    >
                      Eliminar Registro
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Card: Collapse & Tooltip */}
          <ComponentCard
            title="Collapse & Tooltip"
            desc="Secciones colapsables tipo acordeón y tooltips con posicionamiento inteligente."
          >
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Collapse (Acordeón)
                </span>
                <Collapse title="¿Qué es este template?" defaultOpen={true}>
                  <p className="p-3 text-xs text-gray dark:text-gray-light leading-relaxed">
                    Es una plantilla limpia de Dashboard construida con Next.js App Router, Tailwind CSS v4, Lucide Icons y arquitectura modular basada en features.
                  </p>
                </Collapse>
              </div>

              <div className="pt-2 border-t border-gray-light dark:border-gray/20">
                <span className="block text-xs font-semibold text-gray dark:text-gray-light mb-2">
                  Tooltip
                </span>
                <div className="flex items-center gap-3">
                  <Tooltip content="Tooltip superior con información útil" position="top">
                    <Button variant="outline" size="sm">
                      Hover: Top
                    </Button>
                  </Tooltip>
                  <Tooltip content="Tooltip a la derecha" position="right">
                    <Button variant="outline" size="sm">
                      Hover: Right
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Card: Table (Ancho Completo) */}
          <div className="md:col-span-2">
            <ComponentCard
              title="Table (Tabla de Datos Estilizada)"
              desc="Componentes de tabla semántica (Table, TableHeader, TableBody, TableRow, TableCell)."
            >
              <div className="overflow-x-auto rounded-xl border border-gray-light dark:border-gray/30">
                <Table className="w-full text-left text-sm">
                  <TableHeader className="border-b border-gray-light bg-light/70 dark:border-gray/20 dark:bg-black/30">
                    <TableRow>
                      <TableCell isHeader className="p-3.5 font-semibold text-gray-dark dark:text-light">
                        Usuario
                      </TableCell>
                      <TableCell isHeader className="p-3.5 font-semibold text-gray-dark dark:text-light">
                        Rol
                      </TableCell>
                      <TableCell isHeader className="p-3.5 font-semibold text-gray-dark dark:text-light">
                        Estado
                      </TableCell>
                      <TableCell isHeader className="p-3.5 font-semibold text-gray-dark dark:text-light">
                        Última Conexión
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-light/60 dark:divide-gray/20">
                    <TableRow className="hover:bg-light/40 dark:hover:bg-white/[0.02] transition-colors">
                      <TableCell className="p-3.5 font-medium text-gray-dark dark:text-light flex items-center gap-2.5">
                        <AvatarText name="Alex Johnson" className="h-7 w-7 text-xs" />
                        <span>Alex Johnson</span>
                      </TableCell>
                      <TableCell className="p-3.5 text-gray dark:text-gray-light">
                        Super Admin
                      </TableCell>
                      <TableCell className="p-3.5">
                        <Badge color="success" size="sm">
                          Activo
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3.5 text-gray dark:text-gray-light text-xs">
                        Hace 10 min
                      </TableCell>
                    </TableRow>

                    <TableRow className="hover:bg-light/40 dark:hover:bg-white/[0.02] transition-colors">
                      <TableCell className="p-3.5 font-medium text-gray-dark dark:text-light flex items-center gap-2.5">
                        <AvatarText name="Carolina Vega" className="h-7 w-7 text-xs" />
                        <span>Carolina Vega</span>
                      </TableCell>
                      <TableCell className="p-3.5 text-gray dark:text-gray-light">
                        Desarrolladora
                      </TableCell>
                      <TableCell className="p-3.5">
                        <Badge color="info" size="sm">
                          En línea
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3.5 text-gray dark:text-gray-light text-xs">
                        Activa ahora
                      </TableCell>
                    </TableRow>

                    <TableRow className="hover:bg-light/40 dark:hover:bg-white/[0.02] transition-colors">
                      <TableCell className="p-3.5 font-medium text-gray-dark dark:text-light flex items-center gap-2.5">
                        <AvatarText name="Mateo Ruiz" className="h-7 w-7 text-xs" />
                        <span>Mateo Ruiz</span>
                      </TableCell>
                      <TableCell className="p-3.5 text-gray dark:text-gray-light">
                        Invitado
                      </TableCell>
                      <TableCell className="p-3.5">
                        <Badge color="warning" size="sm">
                          Pendiente
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3.5 text-gray dark:text-gray-light text-xs">
                        Ayer
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </ComponentCard>
          </div>

          {/* Card: ResponsiveImage */}
          <div className="md:col-span-2">
            <ComponentCard
              title="ResponsiveImage (Imágenes Adaptables)"
              desc="Contenedor optimizado para carga de imágenes con proporciones preservadas."
            >
              <div className="max-w-md mx-auto">
                <ResponsiveImage
                  src="https://imgs.search.brave.com/wv8hxsCe54rj7_QMQ7Rg_FkU_lUqCO81L_GNaw6DdkA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY2hp/Y2tlbi1saXR0bGUt/YmFja2dyb3VuZC1t/Zzh3dGtmZGtmeGlj/OWtlLmpwZw"
                  alt="Ejemplo de ResponsiveImage"
                  width={500}
                  height={250}
                  className="w-full h-52 rounded-xl object-cover shadow-theme-xs border border-gray-light dark:border-gray/30"
                />
              </div>
            </ComponentCard>
          </div>
        </div>
      </section>
    </div>
  );
}
