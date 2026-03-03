import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
const ThemeContext = createContext(null);
export const ThemeProvider = ({ children, defaultScheme = 'system', storageKey = 'ui-color-scheme', }) => {
    const [colorScheme, setColorSchemeState] = useState(() => {
        try {
            return window.localStorage.getItem(storageKey) ?? defaultScheme;
        }
        catch {
            return defaultScheme;
        }
    });
    const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedScheme = colorScheme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : colorScheme;
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', resolvedScheme);
        root.classList.toggle('dark', resolvedScheme === 'dark');
    }, [resolvedScheme]);
    const setColorScheme = useCallback((scheme) => {
        setColorSchemeState(scheme);
        try {
            window.localStorage.setItem(storageKey, scheme);
        }
        catch {
            // Ignore
        }
    }, [storageKey]);
    const value = useMemo(() => ({ colorScheme, resolvedScheme, setColorScheme }), [colorScheme, resolvedScheme, setColorScheme]);
    return _jsx(ThemeContext.Provider, { value: value, children: children });
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
//# sourceMappingURL=theme-context.js.map