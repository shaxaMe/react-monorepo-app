var _a;
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
var __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@features': resolve(__dirname, './src/features'),
            '@shared': resolve(__dirname, './src/shared'),
            '@app': resolve(__dirname, './src/app'),
            '@repo/ui/styles': resolve(__dirname, '../../packages/ui/src/styles/globals.css'),
            '@repo/ui': resolve(__dirname, '../../packages/ui/src'),
            '@repo/hooks': resolve(__dirname, '../../packages/hooks/src'),
            '@repo/utils': resolve(__dirname, '../../packages/utils/src'),
            '@repo/types': resolve(__dirname, '../../packages/types/src'),
        },
    },
    build: {
        target: 'esnext',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    state: ['zustand'],
                    http: ['axios'],
                    ui: ['@repo/ui'],
                },
            },
        },
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: (_a = process.env.VITE_API_BASE_URL) !== null && _a !== void 0 ? _a : 'http://localhost:4000',
                changeOrigin: true,
            },
        },
    },
});
