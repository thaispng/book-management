"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

interface ToasterProps {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

const Toaster = ({ position = "top-right" }: ToasterProps) => {
  const { theme: currentTheme = "system" } = useTheme();
  const theme =
    currentTheme === "system" ||
    currentTheme === "light" ||
    currentTheme === "dark"
      ? currentTheme
      : "system";

  return (
    <Sonner
      theme={theme}
      position={position}
      toastOptions={{
        classNames: {
          toast: "toast bg-background text-foreground border-border shadow-lg",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
    />
  );
};

const showSuccessToast = (message: string) => {
  toast(message, {
    className: "bg-green-500 text-white border-green-600 shadow-lg",
  });
};

const showErrorToast = (message: string) => {
  toast(message, {
    className: "bg-red-500 text-white border-red-600 shadow-lg",
  });
};

export { Toaster, showSuccessToast, showErrorToast };
