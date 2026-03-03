import { useEffect, useState } from 'react';

/**
 * Debounces a value by delaying updates until `delay` ms after the last change.
 * Use for search inputs to avoid firing on every keystroke.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
