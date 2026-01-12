"use client";

import * as React from "react";
import { type ThemeName, defaultTheme } from "@/lib/themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const initialState: ThemeProviderState = {
  theme: defaultTheme,
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme: defaultThemeProp = defaultTheme,
  storageKey = "portfolio-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeName>(defaultThemeProp);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const stored = localStorage.getItem(storageKey) as ThemeName;
    if (stored && ['ocean-breeze', 'sunset-garden', 'mint-citrus', 'peachy-dusk'].includes(stored)) {
      setThemeState(stored);
    }
  }, [storageKey]);

  React.useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('ocean-breeze', 'sunset-garden', 'mint-citrus', 'peachy-dusk');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: ThemeName) => {
      setThemeState(newTheme);
    },
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};


