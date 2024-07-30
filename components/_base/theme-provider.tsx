// components/_base/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-theme";
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </NextThemesProvider>
  );
}
