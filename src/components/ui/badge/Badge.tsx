import React from "react";

export type BadgeVariant = "light" | "solid";
export type BadgeSize = "xs" | "sm" | "md" | "lg";
export type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant; // Light or solid variant
  size?: BadgeSize; // Badge size
  color?: BadgeColor; // Badge color
  variantColor?: string; // Custom classes or color override
  dot?: boolean; // Muestra el punto indicador (por defecto true)
  pulse?: boolean; // Efecto de pulso animado en el punto indicador
  startIcon?: React.ReactNode; // Icon at the start
  endIcon?: React.ReactNode; // Icon at the end
  children: React.ReactNode; // Badge content
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "light",
  variantColor,
  color = "primary",
  size = "md",
  dot = true,
  pulse = false,
  startIcon,
  endIcon,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium tracking-wide select-none backdrop-blur-xs transition-all duration-200";

  // Size styles con proporciones refinadas
  const sizeStyles: Record<BadgeSize, string> = {
    xs: "px-1 py-0.2 text-[9px] leading-4 gap-1",
    sm: "px-2 py-0.5 text-[11px] leading-4 gap-1",
    md: "px-2.5 py-0.5 text-xs leading-4 gap-1.5",
    lg: "px-3 py-1 text-sm leading-5 gap-2",
  };

  // Variantes: Solid con relieve 3D sutil (degradado, brillo superior y sombra inferior)
  // Light con acabado frosted glass (translúcido, resplandor interior y ring refinado)
  const variants: Record<BadgeVariant, Record<BadgeColor, string>> = {
    light: {
      primary:
        "bg-brand/10 text-brand-dark ring-1 ring-inset ring-brand/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:bg-brand/15 dark:text-brand-light dark:ring-brand/35 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
      success:
        "bg-success/10 text-success-dark ring-1 ring-inset ring-success/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:bg-success/15 dark:text-success-light dark:ring-success/35 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
      error:
        "bg-error/10 text-error-dark ring-1 ring-inset ring-error/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:bg-error/15 dark:text-error-light dark:ring-error/35 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
      warning:
        "bg-warning/10 text-warning-dark ring-1 ring-inset ring-warning/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:bg-warning/15 dark:text-orange-light dark:ring-warning/35 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
      info:
        "bg-blue-light/10 text-blue-light-dark ring-1 ring-inset ring-blue-light/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:bg-blue-light/15 dark:text-blue-light-light dark:ring-blue-light/35 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
      light:
        "bg-light/80 text-gray-dark ring-1 ring-inset ring-gray/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-white/[0.06] dark:text-light dark:ring-white/10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
      dark:
        "bg-gray-dark/5 text-gray-dark ring-1 ring-inset ring-gray-dark/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:bg-white/[0.08] dark:text-light-accent dark:ring-white/15 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
    },
    solid: {
      primary:
        "bg-gradient-to-b from-brand via-brand to-brand-dark text-white font-semibold shadow-[0_2px_5px_-1px_rgba(99,102,241,0.4),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/25 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]",
      success:
        "bg-gradient-to-b from-success via-success to-success-dark text-white font-semibold shadow-[0_2px_5px_-1px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/25 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]",
      error:
        "bg-gradient-to-b from-error via-error to-error-dark text-white font-semibold shadow-[0_2px_5px_-1px_rgba(239,68,68,0.4),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/25 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]",
      warning:
        "bg-gradient-to-b from-warning via-warning to-warning-dark text-white font-semibold shadow-[0_2px_5px_-1px_rgba(245,158,11,0.4),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/25 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]",
      info:
        "bg-gradient-to-b from-blue-light via-blue-light to-blue-light-dark text-white font-semibold shadow-[0_2px_5px_-1px_rgba(2,132,199,0.4),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/25 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]",
      light:
        "bg-gradient-to-b from-white via-light to-gray-light text-gray-dark font-semibold shadow-[0_2px_4px_-1px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.06)] ring-1 ring-inset ring-gray/20 dark:from-gray-dark dark:via-gray-dark dark:to-black dark:text-light-accent dark:ring-white/15 dark:shadow-[0_2px_5px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]",
      dark:
        "bg-gradient-to-b from-gray to-gray-dark text-white font-semibold shadow-[0_2px_5px_-1px_rgba(15,23,42,0.45),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/15 dark:from-gray-dark dark:to-black dark:ring-white/15",
    },
  };

  const sizeClass = sizeStyles[size];
  const colorStyles = variantColor ? variantColor : variants[variant][color];

  return (
    <span
      className={`${baseStyles} ${sizeClass} ${colorStyles} ${className}`}
      {...props}
    >
      {startIcon && <span className="shrink-0 flex items-center">{startIcon}</span>}
      {dot && (
        <span className="relative flex size-1.5 shrink-0 items-center justify-center">
          {pulse && (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
          )}
          <span className="size-1.5 rounded-full bg-current opacity-90" />
        </span>
      )}
      <span>{children}</span>
      {endIcon && <span className="shrink-0 flex items-center">{endIcon}</span>}
    </span>
  );
};

export default Badge;
