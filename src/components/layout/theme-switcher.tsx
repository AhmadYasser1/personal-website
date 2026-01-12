"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/components/theme-provider";
import { themes, themeLabels, type ThemeName } from "@/lib/themes";
import { Button } from "@/components/ui/button";

const themePreviewColors: Record<ThemeName, { primary: string; secondary: string; accent: string }> = {
  'ocean-breeze': { primary: '#5DB8DB', secondary: '#8FCCBA', accent: '#E8956D' },
  'sunset-garden': { primary: '#E08858', secondary: '#A8C789', accent: '#ECA964' },
  'mint-citrus': { primary: '#6EBAA7', secondary: '#C4E6D4', accent: '#E5984B' },
  'peachy-dusk': { primary: '#7E92CB', secondary: '#C4AC8A', accent: '#E09376' },
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch theme"
        className="relative"
      >
        <motion.div
          className="flex gap-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div 
            className="w-1.5 h-5 rounded-full" 
            style={{ background: themePreviewColors[theme].primary }}
          />
          <div 
            className="w-1.5 h-5 rounded-full" 
            style={{ background: themePreviewColors[theme].secondary }}
          />
          <div 
            className="w-1.5 h-5 rounded-full" 
            style={{ background: themePreviewColors[theme].accent }}
          />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border/50 bg-card shadow-lg z-50 overflow-hidden"
            >
              <div className="p-2 border-b border-border/50 bg-muted/30">
                <p className="text-xs font-medium text-muted-foreground px-2">
                  Select Theme
                </p>
              </div>
              <div className="p-2 space-y-1">
                {(Object.keys(themes) as ThemeName[]).map((themeName) => (
                  <motion.button
                    key={themeName}
                    onClick={() => handleThemeChange(themeName)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      theme === themeName
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted/50 text-foreground'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex gap-1 shrink-0">
                      <div 
                        className="w-3 h-3 rounded-full border border-border/30" 
                        style={{ background: themePreviewColors[themeName].primary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full border border-border/30" 
                        style={{ background: themePreviewColors[themeName].secondary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full border border-border/30" 
                        style={{ background: themePreviewColors[themeName].accent }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {themeLabels[themeName]}
                    </span>
                    {theme === themeName && (
                      <motion.div
                        layoutId="theme-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
