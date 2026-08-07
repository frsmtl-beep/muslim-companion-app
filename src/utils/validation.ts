/**
 * Validate an email address format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate a password (min 8 chars).
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Validate coordinates.
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Check that a string is not empty.
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}
