type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    readonly variant?: ButtonVariant;
    readonly size?: ButtonSize;
    readonly isLoading?: boolean;
    readonly leftIcon?: React.ReactNode;
    readonly rightIcon?: React.ReactNode;
}
/**
 * Primary call-to-action button.
 * Forwards refs for integration with form libraries and focus management.
 */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Button.d.ts.map