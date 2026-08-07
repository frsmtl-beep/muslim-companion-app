/**
 * Format a countdown in milliseconds to a human-readable string.
 * e.g. 3723000 => "1h 02min 03s"
 */
export function formatCountdown(ms: number): string {
  if (ms <= 0) return '0h 00min 00s';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}min ${seconds.toString().padStart(2, '0')}s`;
}

/**
 * Format a prayer time string "HH:MM" to a localized 12h or 24h format.
 */
export function formatPrayerTime(time: string, use12h = false): string {
  const [h, m] = time.split(':').map(Number);
  if (!use12h) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
}

/**
 * Format degrees to a compass direction abbreviation.
 * e.g. 45 => "NE"
 */
export function degreesToCompassPoint(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const idx = Math.round(((deg % 360) + 360) % 360 / 45) % 8;
  return directions[idx];
}

/**
 * Returns a locale-formatted date string.
 */
export function formatDate(date: Date, locale = 'fr-CA'): string {
  return date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
