/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/config/eslint/react'],
  parserOptions: {
    project: './tsconfig.app.json',
    tsconfigRootDir: __dirname,
  },
};
