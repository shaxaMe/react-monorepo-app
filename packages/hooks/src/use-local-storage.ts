import { storage } from '@repo/utils';
import { useCallback, useEffect, useState } from 'react';

/**
 * React state that is persisted to localStorage.
 * Syncs across tabs via the 'storage' event.
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get<T>(key) ?? initialValue;
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      storage.set(key, value);
    },
    [key],
  );

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue) as T);
        } catch {
          // Ignore malformed JSON
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => { window.removeEventListener('storage', handleStorageChange); };
  }, [key]);

  return [storedValue, setValue];
};
