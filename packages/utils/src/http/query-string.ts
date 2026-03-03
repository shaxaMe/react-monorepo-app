type QueryValue = string | number | boolean | null | undefined;

/**
 * Builds a query string from a params object, omitting null/undefined values.
 */
export const buildQueryString = (params: Record<string, QueryValue>): string => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const result = searchParams.toString();
  return result ? `?${result}` : '';
};
