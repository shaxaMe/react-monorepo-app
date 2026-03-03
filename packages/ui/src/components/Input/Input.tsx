import { forwardRef, useId } from 'react';

import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly helperText?: string;
  readonly errorMessage?: string;
  readonly leftAddon?: React.ReactNode;
  readonly rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, errorMessage, leftAddon, rightAddon, id: externalId, className = '', ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(errorMessage);

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {props.required && <span className={styles.required} aria-hidden="true"> *</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leftAddon && (
            <span className={styles.leftAddon} aria-hidden="true">{leftAddon}</span>
          )}
          <input
            ref={ref}
            id={id}
            className={[
              styles.input,
              hasError ? styles.error : '',
              leftAddon ? styles.hasLeftAddon : '',
              rightAddon ? styles.hasRightAddon : '',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={hasError}
            aria-describedby={
              [errorMessage ? errorId : null, helperText ? helperId : null]
                .filter(Boolean)
                .join(' ') || undefined
            }
            {...props}
          />
          {rightAddon && (
            <span className={styles.rightAddon} aria-hidden="true">{rightAddon}</span>
          )}
        </div>
        {hasError && (
          <p id={errorId} className={styles.errorText} role="alert">
            {errorMessage}
          </p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
