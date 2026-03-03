import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import unicorn from 'eslint-plugin-unicorn';
import boundaries from 'eslint-plugin-boundaries';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,

    // Base configuration for all TypeScript files
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                // High-performance project resolution for monorepos
                projectService: true,
                // Relative to current file
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            import: importX,
            unicorn,
            boundaries,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: ['./tsconfig.json', 'packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
                },
                node: true,
            },
            'boundaries/elements': [
                {
                    type: 'app',
                    pattern: 'apps/*',
                },
                {
                    type: 'package',
                    pattern: 'packages/*',
                },
            ],
        },
        rules: {
            // TypeScript Strictness
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',

            // Architectural Boundaries
            'boundaries/entry-point': [
                'error',
                {
                    default: 'disallow',
                    rules: [
                        {
                            target: 'package',
                            allow: 'src/index.ts',
                        },
                    ],
                },
            ],
            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    message: '${file.type} is not allowed to import ${dependency.type}',
                    rules: [
                        {
                            from: 'app',
                            allow: ['package'],
                        },
                        {
                            from: 'package',
                            allow: ['package'], // Packages can depend on other packages
                        },
                    ],
                },
            ],

            // Import Organization
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    pathGroups: [
                        {
                            pattern: '@repo/**',
                            group: 'internal',
                            position: 'before',
                        },
                    ],
                },
            ],
            'import/no-cycle': 'error',
            'import/no-duplicates': 'error',

            // Code Quality (Unicorn)
            'unicorn/filename-case': [
                'error',
                { cases: { kebabCase: true, pascalCase: true } },
            ],
            'unicorn/no-null': 'off', // React patterns often use null
            'unicorn/prevent-abbreviations': 'off',
        },
    },

    // Ignore patterns
    {
        ignores: [
            '**/dist/**',
            '**/build/**',
            '**/.turbo/**',
            '**/coverage/**',
            '**/storybook-static/**',
            '**/node_modules/**',
            '*.config.js',
            '*.config.ts',
            'vite.config.*',
            'vitest.config.*',
        ],
    },
);