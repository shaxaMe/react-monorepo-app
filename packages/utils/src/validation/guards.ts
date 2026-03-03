export const isNonNullable = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !Number.isNaN(value);

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const hasProperty = <K extends PropertyKey>(
  obj: unknown,
  key: K,
): obj is Record<K, unknown> => isObject(obj) && key in obj;

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union case: ${JSON.stringify(value)}`);
};
