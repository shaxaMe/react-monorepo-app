/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['./base', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/strict'],
  plugins: ['react-refresh'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
