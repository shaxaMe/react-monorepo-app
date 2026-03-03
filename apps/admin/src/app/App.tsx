import { ThemeProvider } from '@repo/ui';
import { AppRouter } from '@shared/router/AppRouter';
import { Suspense } from 'react';

export const App = () => {
  return (
    <ThemeProvider defaultScheme="system">
      <Suspense fallback={<div>Loading...</div>}>
        <AppRouter />
      </Suspense>
    </ThemeProvider>
  );
};
