/**
 * Attempts to get the value from the object if it's not undefined
 * otherwise returns the default
 * @param input The starting value
 * @param fallback The value to use if it's undefined 
 * @returns The value of the object or the default if it's undefined.
 */
export function getOrDefault<T>(input: T, fallback: T) {
  if (input) return input;
  return fallback;
}