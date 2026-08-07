import axios from 'axios';
import { Coordinates, PrayerName } from '../types';
import { AlAdhanTimingsResponse, PrayerTime, PrayerTimes, CalculationMethodId, PrayerAdjustment } from '../types/prayer';
import ENV from '../config/env';
import { storageService } from './storage';
import { STORAGE_KEYS } from '../constants/settings';

// ─── Local calculation fallback using adhan-js ───────────────────────────────
import { Coordinates as AdhanCoordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes, Madhab } from 'adhan';

const ADHAN_METHOD_MAP: Record<number, () => CalculationMethod> = {
  0: () => CalculationMethod.Tehran(),
  1: () => CalculationMethod.Karachi(),
  2: () => CalculationMethod.NorthAmerica(),
  3: () => CalculationMethod.MuslimWorldLeague(),
  4: () => CalculationMethod.UmmAlQura(),
  5: () => CalculationMethod.Egyptian(),
  7: () => CalculationMethod.Tehran(),
  8: () => CalculationMethod.Gulf(),
  9: () => CalculationMethod.Kuwait(),
  10: () => CalculationMethod.Qatar(),
  11: () => CalculationMethod.Singapore(),
  12: () => CalculationMethod.France(),
  13: () => CalculationMethod.Turkey(),
  14: () => CalculationMethod.Russia(),
  15: () => CalculationMethod.MoonsightingCommittee(),
};

function formatAdhanTime(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function calculateLocalPrayerTimes(
  latitude: number,
  longitude: number,
  methodId: number,
  date: Date = new Date(),
): Record<PrayerName, string> {
  const coords = new AdhanCoordinates(latitude, longitude);
  const methodFactory = ADHAN_METHOD_MAP[methodId] ?? ADHAN_METHOD_MAP[2];
  const params = methodFactory();
  params.madhab = Madhab.Shafi;

  const times = new AdhanPrayerTimes(coords, date, params);
  return {
    Fajr: formatAdhanTime(times.fajr),
    Sunrise: formatAdhanTime(times.sunrise),
    Dhuhr: formatAdhanTime(times.dhuhr),
    Asr: formatAdhanTime(times.asr),
    Maghrib: formatAdhanTime(times.maghrib),
    Isha: formatAdhanTime(times.isha),
  };
}

// ─── AlAdhan API ──────────────────────────────────────────────────────────────
async function fetchFromAlAdhan(
  latitude: number,
  longitude: number,
  methodId: number,
  date?: Date,
): Promise<Record<PrayerName, string>> {
  const d = date ?? new Date();
  const timestamp = Math.floor(d.getTime() / 1000);
  const url = `${ENV.aladhanApiBase}/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${methodId}`;

  const response = await axios.get<AlAdhanTimingsResponse>(url, { timeout: 8000 });

  if (response.data.code !== 200) {
    throw new Error(`AlAdhan API error: ${response.data.status}`);
  }

  const t = response.data.data.timings;
  return {
    Fajr: t.Fajr,
    Sunrise: t.Sunrise,
    Dhuhr: t.Dhuhr,
    Asr: t.Asr,
    Maghrib: t.Maghrib,
    Isha: t.Isha,
  };
}

// ─── Cache helpers ────────────────────────────────────────────────────────────
function getCacheKey(latitude: number, longitude: number, methodId: number, dateStr: string): string {
  return `${STORAGE_KEYS.PRAYER_CACHE}_${latitude.toFixed(4)}_${longitude.toFixed(4)}_${methodId}_${dateStr}`;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// ─── Main service ─────────────────────────────────────────────────────────────
function applyAdjustments(
  timings: Record<PrayerName, string>,
  adjustments: Partial<PrayerAdjustment>,
): Record<PrayerName, string> {
  const result = { ...timings };
  (Object.keys(adjustments) as PrayerName[]).forEach((prayer) => {
    const minutesAdj = adjustments[prayer] ?? 0;
    if (minutesAdj === 0) return;
    const [h, m] = timings[prayer].split(':').map(Number);
    const totalMinutes = h * 60 + m + minutesAdj;
    const newH = Math.floor(((totalMinutes % 1440) + 1440) % 1440 / 60);
    const newM = ((totalMinutes % 1440) + 1440) % 1440 % 60;
    result[prayer] = `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
  });
  return result;
}

function timingsToPrayerTimes(
  timings: Record<PrayerName, string>,
  dateStr: string,
): PrayerTime[] {
  const dateBase = new Date(dateStr);
  return (['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as PrayerName[]).map((name) => {
    const [h, m] = timings[name].split(':').map(Number);
    const prayerDate = new Date(dateBase);
    prayerDate.setHours(h, m, 0, 0);
    return {
      name,
      time: timings[name],
      timestamp: prayerDate.getTime(),
      enabled: true,
    };
  });
}

export async function getPrayerTimes(
  latitude: number,
  longitude: number,
  methodId: CalculationMethodId = 2,
  adjustments: Partial<PrayerAdjustment> = {},
  date: Date = new Date(),
): Promise<PrayerTimes> {
  const dateStr = formatDate(date);
  const cacheKey = getCacheKey(latitude, longitude, methodId, dateStr);

  // 1. Try cache first
  const cached = await storageService.getItem<PrayerTimes>(cacheKey);
  if (cached) {
    return cached;
  }

  let timings: Record<PrayerName, string>;

  // 2. Try AlAdhan API
  try {
    timings = await fetchFromAlAdhan(latitude, longitude, methodId, date);
  } catch (_err) {
    // 3. Fallback to local calculation
    timings = calculateLocalPrayerTimes(latitude, longitude, methodId, date);
  }

  // Apply manual adjustments
  const adjustedTimings = applyAdjustments(timings, adjustments);

  const result: PrayerTimes = {
    date: dateStr,
    location: { latitude, longitude },
    method: methodId,
    timings: adjustedTimings,
    prayers: timingsToPrayerTimes(adjustedTimings, dateStr),
  };

  // Cache result
  await storageService.setItem(cacheKey, result, 24 * 60 * 60 * 1000); // 24h TTL

  return result;
}

export function getNextPrayer(prayers: PrayerTime[]): { prayer: PrayerTime; msUntil: number } | null {
  const now = Date.now();
  const upcoming = prayers
    .filter((p) => p.name !== 'Sunrise' && p.timestamp > now)
    .sort((a, b) => a.timestamp - b.timestamp);
  if (!upcoming.length) return null;
  const prayer = upcoming[0];
  return { prayer, msUntil: prayer.timestamp - now };
}

export const prayerService = {
  getPrayerTimes,
  getNextPrayer,
  calculateLocalPrayerTimes,
};
