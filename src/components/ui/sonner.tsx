"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  const { theme: currentTheme = "system" } = useTheme();
  const theme = currentTheme === "system" || currentTheme === "light" || currentTheme === "dark" ? currentTheme : "system";

  return (
    <Sonner
      theme={theme}
      className="toaster"
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

export { Toaster };
