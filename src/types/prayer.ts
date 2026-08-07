// Types: Prayer Times
export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export interface PrayerTime {
  name: PrayerName;
  time: string; // HH:MM format
  timestamp: number; // Unix timestamp
  enabled: boolean;
}

export interface PrayerTimes {
  date: string; // YYYY-MM-DD
  location: {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
  };
  method: CalculationMethodId;
  timings: Record<PrayerName, string>;
  prayers: PrayerTime[];
}

export interface PrayerTimingsRaw {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export type CalculationMethodId =
  | 0   // Shia Ithna-Ansari
  | 1   // University of Islamic Sciences, Karachi
  | 2   // Islamic Society of North America
  | 3   // Muslim World League
  | 4   // Umm Al-Qura University, Makkah
  | 5   // Egyptian General Authority of Survey
  | 7   // Institute of Geophysics, University of Tehran
  | 8   // Gulf Region
  | 9   // Kuwait
  | 10  // Qatar
  | 11  // Majlis Ugama Islam Singapura
  | 12  // Union Organization Islamic de France
  | 13  // Diyanet İşleri Başkanlığı, Turkey
  | 14  // Spiritual Administration of Muslims of Russia
  | 15; // Moonsighting Committee Worldwide

export interface CalculationMethod {
  id: CalculationMethodId;
  name: string;
  nameAr: string;
  region: string;
}

export interface PrayerAdjustment {
  Fajr: number;
  Sunrise: number;
  Dhuhr: number;
  Asr: number;
  Maghrib: number;
  Isha: number;
}

export interface AlAdhanTimingsResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimingsRaw;
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
      };
    };
  };
}
