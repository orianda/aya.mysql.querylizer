export const toArray = <T>(value?: T | ReadonlyArray<T | undefined>): ReadonlyArray<T> => {
  const values = Array.isArray(value)
    ? value as ReadonlyArray<T | undefined>
    : [value as T | undefined];
  return values.filter((value): value is T => value !== undefined);
}
