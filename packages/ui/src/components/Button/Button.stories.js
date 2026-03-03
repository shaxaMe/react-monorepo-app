import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './Button';
const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost', 'danger'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        isLoading: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};
export default meta;
export const Primary = {
    args: { variant: 'primary', children: 'Primary Button' },
};
export const Secondary = {
    args: { variant: 'secondary', children: 'Secondary Button' },
};
export const Ghost = {
    args: { variant: 'ghost', children: 'Ghost Button' },
};
export const Danger = {
    args: { variant: 'danger', children: 'Danger Button' },
};
export const Loading = {
    args: { variant: 'primary', isLoading: true, children: 'Loading...' },
};
export const Disabled = {
    args: { variant: 'primary', disabled: true, children: 'Disabled' },
};
export const AllSizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '12px', alignItems: 'center' }, children: [_jsx(Button, { size: "sm", children: "Small" }), _jsx(Button, { size: "md", children: "Medium" }), _jsx(Button, { size: "lg", children: "Large" })] })),
};
//# sourceMappingURL=Button.stories.js.map