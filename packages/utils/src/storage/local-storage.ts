/**
 * Type-safe localStorage wrapper with JSON serialization.
 * Fails gracefully in SSR and private browsing contexts.
 */
export const storage = {
  /* eslint-disable @typescript-eslint/no-unnecessary-type-parameters -- Generic API required for call-site ergonomics */
  get<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore QuotaExceededError or SecurityError in private mode
    }
  },
  /* eslint-enable @typescript-eslint/no-unnecessary-type-parameters */

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  },

  clear(): void {
    try {
      window.localStorage.clear();
    } catch {
      // Ignore
    }
  },
};
