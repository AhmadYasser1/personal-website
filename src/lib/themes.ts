export type ThemeName = 'ocean-breeze' | 'sunset-garden' | 'mint-citrus' | 'peachy-dusk';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
  'ocean-breeze': {
    background: 'oklch(0.98 0.01 90)',
    foreground: 'oklch(0.25 0.08 240)',
    card: 'oklch(0.99 0.005 90)',
    cardForeground: 'oklch(0.25 0.08 240)',
    popover: 'oklch(0.99 0.005 90)',
    popoverForeground: 'oklch(0.25 0.08 240)',
    primary: 'oklch(0.55 0.15 210)',
    primaryForeground: 'oklch(0.99 0.005 210)',
    secondary: 'oklch(0.75 0.10 180)',
    secondaryForeground: 'oklch(0.25 0.08 180)',
    muted: 'oklch(0.92 0.02 220)',
    mutedForeground: 'oklch(0.45 0.06 230)',
    accent: 'oklch(0.70 0.15 40)',
    accentForeground: 'oklch(0.99 0.005 40)',
    destructive: 'oklch(0.577 0.245 27.325)',
    destructiveForeground: 'oklch(0.99 0.005 27)',
    border: 'oklch(0.88 0.03 200)',
    input: 'oklch(0.88 0.03 200)',
    ring: 'oklch(0.55 0.15 210)',
  },
  'sunset-garden': {
    background: 'oklch(0.97 0.02 70)',
    foreground: 'oklch(0.30 0.05 60)',
    card: 'oklch(0.98 0.015 70)',
    cardForeground: 'oklch(0.30 0.05 60)',
    popover: 'oklch(0.98 0.015 70)',
    popoverForeground: 'oklch(0.30 0.05 60)',
    primary: 'oklch(0.65 0.18 45)',
    primaryForeground: 'oklch(0.99 0.01 45)',
    secondary: 'oklch(0.72 0.12 140)',
    secondaryForeground: 'oklch(0.25 0.06 140)',
    muted: 'oklch(0.90 0.03 75)',
    mutedForeground: 'oklch(0.45 0.04 65)',
    accent: 'oklch(0.75 0.16 65)',
    accentForeground: 'oklch(0.25 0.05 65)',
    destructive: 'oklch(0.60 0.22 35)',
    destructiveForeground: 'oklch(0.99 0.01 35)',
    border: 'oklch(0.86 0.04 70)',
    input: 'oklch(0.86 0.04 70)',
    ring: 'oklch(0.65 0.18 45)',
  },
  'mint-citrus': {
    background: 'oklch(0.97 0.02 160)',
    foreground: 'oklch(0.28 0.08 150)',
    card: 'oklch(0.98 0.015 160)',
    cardForeground: 'oklch(0.28 0.08 150)',
    popover: 'oklch(0.98 0.015 160)',
    popoverForeground: 'oklch(0.28 0.08 150)',
    primary: 'oklch(0.60 0.14 175)',
    primaryForeground: 'oklch(0.99 0.01 175)',
    secondary: 'oklch(0.82 0.08 165)',
    secondaryForeground: 'oklch(0.25 0.08 165)',
    muted: 'oklch(0.92 0.03 170)',
    mutedForeground: 'oklch(0.45 0.07 160)',
    accent: 'oklch(0.72 0.20 50)',
    accentForeground: 'oklch(0.25 0.08 50)',
    destructive: 'oklch(0.60 0.22 30)',
    destructiveForeground: 'oklch(0.99 0.01 30)',
    border: 'oklch(0.87 0.04 165)',
    input: 'oklch(0.87 0.04 165)',
    ring: 'oklch(0.60 0.14 175)',
  },
  'peachy-dusk': {
    background: 'oklch(0.96 0.03 60)',
    foreground: 'oklch(0.32 0.02 50)',
    card: 'oklch(0.97 0.025 60)',
    cardForeground: 'oklch(0.32 0.02 50)',
    popover: 'oklch(0.97 0.025 60)',
    popoverForeground: 'oklch(0.32 0.02 50)',
    primary: 'oklch(0.58 0.12 230)',
    primaryForeground: 'oklch(0.99 0.015 230)',
    secondary: 'oklch(0.78 0.05 70)',
    secondaryForeground: 'oklch(0.30 0.02 70)',
    muted: 'oklch(0.90 0.02 60)',
    mutedForeground: 'oklch(0.48 0.02 55)',
    accent: 'oklch(0.75 0.14 50)',
    accentForeground: 'oklch(0.25 0.02 50)',
    destructive: 'oklch(0.60 0.22 25)',
    destructiveForeground: 'oklch(0.99 0.015 25)',
    border: 'oklch(0.85 0.03 65)',
    input: 'oklch(0.85 0.03 65)',
    ring: 'oklch(0.58 0.12 230)',
  },
};

export const themeLabels: Record<ThemeName, string> = {
  'ocean-breeze': 'Ocean Breeze',
  'sunset-garden': 'Sunset Garden',
  'mint-citrus': 'Mint Citrus',
  'peachy-dusk': 'Peachy Dusk',
};

export const defaultTheme: ThemeName = 'ocean-breeze';
