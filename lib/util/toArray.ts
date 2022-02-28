export const toArray = <T>(value?: T | ReadonlyArray<T | undefined>): ReadonlyArray<T> => {
  const values = Array.isArray(value) ? value : [value];
  return values.filter((value) => value !== undefined);
}
