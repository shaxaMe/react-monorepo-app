/**
 * Ambient type declaration for CSS Modules.
 * Tells TypeScript to treat `*.module.css` imports as an object of string keys.
 */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
