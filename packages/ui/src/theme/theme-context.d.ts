export type ColorScheme = 'light' | 'dark' | 'system';
interface ThemeContextValue {
    readonly colorScheme: ColorScheme;
    readonly resolvedScheme: 'light' | 'dark';
    readonly setColorScheme: (scheme: ColorScheme) => void;
}
interface ThemeProviderProps {
    readonly children: React.ReactNode;
    readonly defaultScheme?: ColorScheme;
    readonly storageKey?: string;
}
export declare const ThemeProvider: ({ children, defaultScheme, storageKey, }: ThemeProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => ThemeContextValue;
export {};
//# sourceMappingURL=theme-context.d.ts.map