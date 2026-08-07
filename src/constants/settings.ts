import { AppSettings, UserPreferences } from '../types';
import { DEFAULT_CALCULATION_METHOD_ID } from './prayers';

export const DEFAULT_LOCATION = {
  latitude: 45.5017,
  longitude: -73.5673,
  city: 'Montréal',
  country: 'Canada',
  timezone: 'America/Toronto',
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  language: 'fr',
  theme: 'auto',
  firstLaunch: true,
};

export const DEFAULT_USER_PREFERENCES: Omit<UserPreferences, 'userId' | 'createdAt' | 'updatedAt'> = {
  language: 'fr',
  calculationMethod: DEFAULT_CALCULATION_METHOD_ID,
  asrCalculation: 'Standard',
  madhab: 'Shafi',
  prayerAdjustments: {
    Fajr: 0,
    Sunrise: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  },
  notificationsEnabled: true,
  notificationSettings: {
    Fajr: { enabled: true, minutesBefore: 10 },
    Dhuhr: { enabled: true, minutesBefore: 10 },
    Asr: { enabled: true, minutesBefore: 10 },
    Maghrib: { enabled: true, minutesBefore: 10 },
    Isha: { enabled: true, minutesBefore: 10 },
  },
  theme: 'auto',
};

export const NOTIFICATION_MINUTES_OPTIONS = [0, 5, 10, 15, 20, 30];

export const STORAGE_KEYS = {
  PRAYER_CACHE: 'prayer_cache',
  LOCATION: 'user_location',
  PREFERENCES: 'user_preferences',
  FIRST_LAUNCH: 'first_launch',
  QURAN_PROGRESS: 'quran_progress',
  QURAN_FAVORITES: 'quran_favorites',
  QURAN_BOOKMARKS: 'quran_bookmarks',
} as const;
