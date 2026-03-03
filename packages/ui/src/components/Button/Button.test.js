import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
describe('Button', () => {
    it('renders children', () => {
        render(_jsx(Button, { children: "Click me" }));
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });
    it('calls onClick when clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(_jsx(Button, { onClick: onClick, children: "Click me" }));
        await user.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledOnce();
    });
    it('is disabled when disabled prop is true', () => {
        render(_jsx(Button, { disabled: true, children: "Click me" }));
        expect(screen.getByRole('button')).toBeDisabled();
    });
    it('is disabled and shows spinner when isLoading', () => {
        render(_jsx(Button, { isLoading: true, children: "Submit" }));
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-busy', 'true');
    });
    it('does not call onClick when disabled', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(_jsx(Button, { disabled: true, onClick: onClick, children: "Click me" }));
        await user.click(screen.getByRole('button'));
        expect(onClick).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=Button.test.js.map