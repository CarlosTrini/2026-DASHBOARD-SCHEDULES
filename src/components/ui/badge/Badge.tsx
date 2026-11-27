import React from "react";

export type BadgeVariant = "light" | "solid";
export type BadgeSize = "sm" | "md" | "lg";
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
    "inline-flex items-center justify-center rounded-full font-medium tracking-wide select-none backdrop-blur-xs transition-all duration-150";

  // Size styles con proporciones refinadas
  const sizeStyles: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[11px] leading-4 gap-1",
    md: "px-2.5 py-0.5 text-xs leading-4 gap-1.5",
    lg: "px-3 py-1 text-sm leading-5 gap-2",
  };

  // Variantes con acabado pulido, ring sutil y armonía en temas claro/oscuro
  const variants: Record<BadgeVariant, Record<BadgeColor, string>> = {
    light: {
      primary:
        "bg-brand/10 text-brand ring-1 ring-inset ring-brand/25 dark:bg-brand-dark/20 dark:text-brand-light dark:ring-brand-light/20",
      success:
        "bg-success/10 text-success-dark ring-1 ring-inset ring-success/25 dark:bg-success-dark/20 dark:text-success-light dark:ring-success-dark/30",
      error:
        "bg-error/10 text-error-dark ring-1 ring-inset ring-error/25 dark:bg-error-dark/20 dark:text-error-light dark:ring-error-dark/30",
      warning:
        "bg-warning/10 text-warning-dark ring-1 ring-inset ring-warning/25 dark:bg-warning-dark/20 dark:text-orange-light dark:ring-warning-dark/30",
      info:
        "bg-blue-light/10 text-blue-light-dark ring-1 ring-inset ring-blue-light/25 dark:bg-blue-light-dark/20 dark:text-blue-light-light dark:ring-blue-light-dark/30",
      light:
        "bg-light text-gray-dark ring-1 ring-inset ring-gray-light dark:bg-light-accent/10 dark:text-light-accent dark:ring-light-accent/15",
      dark:
        "bg-gray-dark/10 text-gray-dark ring-1 ring-inset ring-gray-dark/20 dark:bg-light-accent/10 dark:text-light-accent dark:ring-light-accent/20",
    },
    solid: {
      primary:
        "bg-brand text-light-accent shadow-xs shadow-brand/25 ring-1 ring-inset ring-white/20 dark:ring-white/15",
      success:
        "bg-success text-light-accent shadow-xs shadow-success/25 ring-1 ring-inset ring-white/20 dark:ring-white/15",
      error:
        "bg-error text-light-accent shadow-xs shadow-error/25 ring-1 ring-inset ring-white/20 dark:ring-white/15",
      warning:
        "bg-warning text-light-accent shadow-xs shadow-warning/25 ring-1 ring-inset ring-white/20 dark:ring-white/15",
      info:
        "bg-blue-light text-light-accent shadow-xs shadow-blue-light/25 ring-1 ring-inset ring-white/20 dark:ring-white/15",
      light:
        "bg-gray-light text-gray-dark shadow-xs ring-1 ring-inset ring-gray/15 dark:bg-light-accent/20 dark:text-light-accent dark:ring-light-accent/20",
      dark:
        "bg-gray-dark text-light-accent shadow-xs ring-1 ring-inset ring-white/15 dark:bg-light-accent dark:text-gray-dark",
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
