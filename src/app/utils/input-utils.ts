/**
 * Sanitizes a string by removing special HTML characters.
 * @param str The input string to sanitize.
 * @returns The sanitized string with special characters removed.
 */

export const sanitize = (str: string): string => {
  const reg = /[&<>"'/]/g
  return str.replace(reg, '')
}
