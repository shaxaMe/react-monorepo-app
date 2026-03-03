export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readonly label?: string;
    readonly helperText?: string;
    readonly errorMessage?: string;
    readonly leftAddon?: React.ReactNode;
    readonly rightAddon?: React.ReactNode;
}
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map