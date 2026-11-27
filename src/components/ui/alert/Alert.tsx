"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  X,
} from "lucide-react";

export type AlertPosition =
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom-center"
  | "botton-center"
  | "bottom-left"
  | "bottom-right";

export interface AlertProps {
  variant: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
  position?: AlertPosition;
  timer?: number | false;
  showClose?: boolean;
  onClose?: () => void;
  className?: string;
}

const positionClasses: Record<AlertPosition, string> = {
  "top-center": "top-5 left-1/2 -translate-x-1/2",
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  "bottom-center": "bottom-5 left-1/2 -translate-x-1/2",
  "botton-center": "bottom-5 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
};

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  showLink = false,
  linkHref = "#",
  linkText = "Ver más",
  position = "top-right",
  timer = 3000,
  showClose = true,
  onClose,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(true);
    setIsLeaving(false);

    if (timer === false || typeof timer !== "number" || timer <= 0) {
      return;
    }

    timerRef.current = setTimeout(() => {
      handleClose();
    }, timer);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timer, title, message, handleClose]);

  if (!isVisible) {
    return null;
  }

  const variantClasses = {
    success: {
      container:
        "border-2 border-success-light/40 bg-linear-to-br from-success-dark/85 via-success-dark/75 to-success/65 dark:from-success-dark/80 dark:via-gray-dark/85 dark:to-success-dark/60 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-light-accent/20 shadow-theme-lg shadow-success/20",
      iconWrapper: "border border-success text-success-light",
    },
    error: {
      container:
        "border-2 border-error-light/40 bg-linear-to-br from-error-dark/85 via-error-dark/75 to-error/65 dark:from-error-dark/80 dark:via-gray-dark/85 dark:to-error-dark/60 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-light-accent/20 shadow-theme-lg shadow-error/20",
      iconWrapper: "border border-error text-light",
    },
    warning: {
      container:
        "border-warning-light/40 bg-linear-to-br from-warning-dark/85 via-warning-dark/75 to-warning/65 dark:from-warning-dark/80 dark:via-gray-dark/85 dark:to-warning-dark/60 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-light-accent/20 shadow-theme-lg shadow-warning/20",
      iconWrapper: "border border-warning text-light",
    },
    info: {
      container:
        "border-brand-light/40 bg-linear-to-br from-brand-dark/85 via-brand/75 to-blue-light/65 dark:from-brand-dark/80 dark:via-gray-dark/85 dark:to-blue-light-dark/60 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-light-accent/20 shadow-theme-lg shadow-brand/20",
      iconWrapper: "border border-brand-light text-light",
    },
  };

  const icons = {
    success: <CheckCircle2 className="size-5" />,
    error: <AlertCircle className="size-5" />,
    warning: <AlertTriangle className="size-5" />,
    info: <Info className="size-5" />,
  };

  const selectedPositionClass =
    positionClasses[position] || positionClasses["top-right"];

  return (
    <div
      role="alert"
      className={`fixed z-99999 flex w-auto min-w-100 items-start gap-3 rounded-xl border px-4 py-2.5 shadow-theme-lg backdrop-blur-md transition-all duration-200 ${
        isLeaving ? "opacity-0 scale-95" : "opacity-100 scale-100"
      } ${selectedPositionClass} ${variantClasses[variant].container} ${className}`}
    >
      <div
        className={`flex size-6 shrink-0 items-center justify-center rounded-xl ${variantClasses[variant].iconWrapper}`}
      >
        {icons[variant]}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className="text-sm font-semibold text-light leading-5">{title}</h4>

        {message && (
          <p className="mt-1 text-sm text-light leading-relaxed">{message}</p>
        )}

        {showLink && (
          <Link
            href={linkHref}
            className="mt-2.5 inline-flex items-center gap-1 text-theme-xs font-semibold text-brand transition-colors hover:text-brand-dark dark:text-brand-light dark:hover:text-brand"
          >
            <span>{linkText}</span>
            <ExternalLink className="size-3.5" />
          </Link>
        )}
      </div>

      {showClose && (
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar alerta"
          className="shrink-0 rounded-full p-1 text-light transition-colors hover:bg-light/50 hover:text-error focus:outline-none cursor-pointer"
        >
          <X className="size-4.5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
