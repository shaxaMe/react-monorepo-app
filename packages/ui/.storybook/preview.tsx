import type { Preview } from '@storybook/react';

import { ThemeProvider } from '../src/theme/theme-context';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals['backgrounds']?.value === '#111827';
      return (
        <ThemeProvider defaultScheme={isDark ? 'dark' : 'light'}>
          <div style={{ padding: '24px' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
