import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';
import styles from './Modal.module.css';
export const Modal = ({ isOpen, onClose, title, children, footer, size = 'md', closeOnOverlayClick = true, }) => {
    const dialogRef = useRef(null);
    const previousFocusRef = useRef(null);
    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement;
            dialogRef.current?.focus();
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
            previousFocusRef.current?.focus();
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => { document.removeEventListener('keydown', handleKeyDown); };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return createPortal(_jsx("div", { className: styles.overlay, onClick: closeOnOverlayClick ? onClose : undefined, role: "presentation", children: _jsxs("div", { ref: dialogRef, role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", tabIndex: -1, className: [styles.modal, styles[size]].join(' '), onClick: (e) => { e.stopPropagation(); }, children: [_jsxs("div", { className: styles.header, children: [_jsx("h2", { id: "modal-title", className: styles.title, children: title }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, "aria-label": "Close modal", className: styles.closeButton, children: "\u2715" })] }), _jsx("div", { className: styles.body, children: children }), footer && _jsx("div", { className: styles.footer, children: footer })] }) }), document.body);
};
Modal.displayName = 'Modal';
//# sourceMappingURL=Modal.js.map