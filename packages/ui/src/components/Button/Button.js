import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import styles from './Button.module.css';
/**
 * Primary call-to-action button.
 * Forwards refs for integration with form libraries and focus management.
 */
export const Button = forwardRef(({ variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, children, className = '', disabled, ...props }, ref) => {
    const isDisabled = disabled ?? isLoading;
    return (_jsxs("button", { ref: ref, className: [
            styles.base,
            styles[variant],
            styles[size],
            isLoading ? styles.loading : '',
            className,
        ]
            .filter(Boolean)
            .join(' '), disabled: isDisabled, "aria-busy": isLoading, ...props, children: [isLoading && (_jsx("span", { className: styles.spinner, "aria-hidden": "true" })), !isLoading && leftIcon && (_jsx("span", { className: styles.iconLeft, "aria-hidden": "true", children: leftIcon })), _jsx("span", { children: children }), !isLoading && rightIcon && (_jsx("span", { className: styles.iconRight, "aria-hidden": "true", children: rightIcon }))] }));
});
Button.displayName = 'Button';
//# sourceMappingURL=Button.js.map