import { useEffect, useState } from 'react';

/**
 * Returns true when the media query matches.
 * SSR-safe: defaults to false on the server.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => { setMatches(event.matches); };

    mediaQueryList.addEventListener('change', listener);
    return () => { mediaQueryList.removeEventListener('change', listener); };
  }, [query]);

  return matches;
};
