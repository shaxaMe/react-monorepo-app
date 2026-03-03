import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import styles from './Input.module.css';
export const Input = forwardRef(({ label, helperText, errorMessage, leftAddon, rightAddon, id: externalId, className = '', ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(errorMessage);
    return (_jsxs("div", { className: styles.wrapper, children: [label && (_jsxs("label", { htmlFor: id, className: styles.label, children: [label, props.required && _jsx("span", { className: styles.required, "aria-hidden": "true", children: " *" })] })), _jsxs("div", { className: styles.inputWrapper, children: [leftAddon && (_jsx("span", { className: styles.leftAddon, "aria-hidden": "true", children: leftAddon })), _jsx("input", { ref: ref, id: id, className: [
                            styles.input,
                            hasError ? styles.error : '',
                            leftAddon ? styles.hasLeftAddon : '',
                            rightAddon ? styles.hasRightAddon : '',
                            className,
                        ]
                            .filter(Boolean)
                            .join(' '), "aria-invalid": hasError, "aria-describedby": [errorMessage ? errorId : null, helperText ? helperId : null]
                            .filter(Boolean)
                            .join(' ') || undefined, ...props }), rightAddon && (_jsx("span", { className: styles.rightAddon, "aria-hidden": "true", children: rightAddon }))] }), hasError && (_jsx("p", { id: errorId, className: styles.errorText, role: "alert", children: errorMessage })), !hasError && helperText && (_jsx("p", { id: helperId, className: styles.helperText, children: helperText }))] }));
});
Input.displayName = 'Input';
//# sourceMappingURL=Input.js.map