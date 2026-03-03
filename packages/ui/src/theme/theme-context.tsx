import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ColorScheme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  readonly colorScheme: ColorScheme;
  readonly resolvedScheme: 'light' | 'dark';
  readonly setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  readonly children: React.ReactNode;
  readonly defaultScheme?: ColorScheme;
  readonly storageKey?: string;
}

export const ThemeProvider = ({
  children,
  defaultScheme = 'system',
  storageKey = 'ui-color-scheme',
}: ThemeProviderProps) => {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    try {
      return (window.localStorage.getItem(storageKey) as ColorScheme | null) ?? defaultScheme;
    } catch {
      return defaultScheme;
    }
  });

  const systemPrefersDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const resolvedScheme: 'light' | 'dark' =
    colorScheme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : colorScheme;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedScheme);
    root.classList.toggle('dark', resolvedScheme === 'dark');
  }, [resolvedScheme]);

  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      setColorSchemeState(scheme);
      try {
        window.localStorage.setItem(storageKey, scheme);
      } catch {
        // Ignore
      }
    },
    [storageKey],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ colorScheme, resolvedScheme, setColorScheme }),
    [colorScheme, resolvedScheme, setColorScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
