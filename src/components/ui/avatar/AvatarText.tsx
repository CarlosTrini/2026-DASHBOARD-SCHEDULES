import React from "react";
import { cn } from "@/utils";

interface AvatarTextProps {
  name: string;
  className?: string;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge"; // Avatar size
}

// Dimensiones del contenedor del avatar
const sizeClasses = {
  xsmall: "h-6 w-6 max-w-6",
  small: "h-8 w-8 max-w-8",
  medium: "h-10 w-10 max-w-10",
  large: "h-12 w-12 max-w-12",
  xlarge: "h-14 w-14 max-w-14",
  xxlarge: "h-16 w-16 max-w-16",
};

// Tamaño de texto escalado proporcionalmente a cada size
const textSizeClasses = {
  xsmall: "text-[10px]",
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
  xlarge: "text-lg",
  xxlarge: "text-xl",
};

const AvatarText: React.FC<AvatarTextProps> = ({
  name,
  className = "",
  size = "medium",
}) => {
  // Generar iniciales a partir del nombre
  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generar un color pastel consistente según el nombre
  const getColorClass = (name: string) => {
    const colors = [
      "bg-brand-light text-brand-dark",
      "bg-pink-100 text-pink-600",
      "bg-cyan-100 text-cyan-600",
      "bg-orange-light text-orange-dark",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-yellow-100 text-yellow-600",
      "bg-error-light text-error-dark",
    ];

    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full select-none font-semibold",
        sizeClasses[size],
        getColorClass(name),
        className
      )}
    >
      <span className={cn("leading-none", textSizeClasses[size])}>
        {initials}
      </span>
    </div>
  );
};

export default AvatarText;
