import { ReactNode } from "react";

export type ButtonVariant = "solid" | "outline";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // Button text or content
  size?: "xs" | "sm" | "md"; // Button size
  variant?: ButtonVariant; // Button variant: "solid" | "outline"
  typeButton?: ButtonColor | (string & {}); // Predefined color or custom CSS string
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "solid",
  typeButton = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  // Size Classes
  const sizeClasses = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant & Color Classes (estilo adaptado para botones en variantes solid y outline)
  const variants: Record<ButtonVariant, Record<ButtonColor, string>> = {
    solid: {
      primary:
        "bg-brand text-light-accent shadow-theme-xs hover:bg-brand-dark dark:hover:bg-brand-dark disabled:bg-brand-light",
      secondary:
        "bg-gray text-light-accent shadow-theme-xs hover:bg-gray-dark dark:hover:bg-gray/80 disabled:bg-gray-light",
      success:
        "bg-success text-light-accent shadow-theme-xs hover:bg-success-dark dark:hover:bg-success-dark disabled:bg-success-light",
      error:
        "bg-error text-light-accent shadow-theme-xs hover:bg-error-dark dark:hover:bg-error-dark disabled:bg-error-light",
      warning:
        "bg-warning text-light-accent shadow-theme-xs hover:bg-warning-dark dark:hover:bg-warning-dark disabled:bg-warning-light",
      info:
        "bg-blue-light text-light-accent shadow-theme-xs hover:bg-blue-light-dark dark:hover:bg-blue-light-dark disabled:bg-blue-light-light",
      light:
        "bg-light text-gray-dark shadow-theme-xs hover:bg-gray-light dark:bg-light-accent/10 dark:text-light-accent dark:hover:bg-light-accent/20",
      dark:
        "bg-gray-dark text-light-accent shadow-theme-xs hover:bg-black dark:bg-light-accent dark:text-gray-dark dark:hover:bg-light disabled:bg-gray",
    },
    outline: {
      primary:
        "bg-transparent text-brand ring-1 ring-inset ring-brand hover:bg-brand/10 dark:text-brand-light dark:ring-brand-light dark:hover:bg-brand/20",
      secondary:
        "bg-transparent text-gray ring-1 ring-inset ring-gray hover:bg-gray/10 dark:text-gray-light dark:ring-gray dark:hover:bg-gray/20",
      success:
        "bg-transparent text-success-dark ring-1 ring-inset ring-success hover:bg-success/10 dark:text-success-light dark:ring-success-dark dark:hover:bg-success-dark/20",
      error:
        "bg-transparent text-error ring-1 ring-inset ring-error hover:bg-error/10 dark:text-error-light dark:ring-error-dark dark:hover:bg-error-dark/20",
      warning:
        "bg-transparent text-warning-dark ring-1 ring-inset ring-warning hover:bg-warning/10 dark:text-warning-light dark:ring-warning-dark dark:hover:bg-warning-dark/20",
      info:
        "bg-transparent text-blue-light-dark ring-1 ring-inset ring-blue-light hover:bg-blue-light/10 dark:text-blue-light-light dark:ring-blue-light-dark dark:hover:bg-blue-light/20",
      light:
        "bg-light-accent text-gray-dark ring-1 ring-inset ring-gray-light hover:bg-light dark:bg-gray-dark dark:text-gray-light dark:ring-gray-dark dark:hover:bg-light-accent/3 dark:hover:text-gray-light",
      dark:
        "bg-transparent text-gray-dark ring-1 ring-inset ring-gray-dark hover:bg-gray-dark/10 dark:text-light-accent dark:ring-light-accent dark:hover:bg-light-accent/10",
    },
  };

  // Determinar clases de color: si typeButton coincide con una variante semántica, se usa;
  // de lo contrario (string arbitrario para color personalizado), se aplica directamente.
  const isPredefinedColor =
    typeButton in (variants[variant] ?? variants.solid);

  const colorClasses = isPredefinedColor
    ? variants[variant]?.[typeButton as ButtonColor] ??
    variants.solid[typeButton as ButtonColor]
    : typeButton;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition ${className} ${sizeClasses[size]} ${colorClasses} ${disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
