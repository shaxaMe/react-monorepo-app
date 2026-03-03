export interface ModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly title: string;
    readonly children: React.ReactNode;
    readonly footer?: React.ReactNode;
    readonly size?: 'sm' | 'md' | 'lg' | 'xl';
    readonly closeOnOverlayClick?: boolean;
}
export declare const Modal: {
    ({ isOpen, onClose, title, children, footer, size, closeOnOverlayClick, }: ModalProps): import("react").ReactPortal | null;
    displayName: string;
};
//# sourceMappingURL=Modal.d.ts.map