// Global types index
export * from './prayer';
export * from './quran';
export * from './user';

// Location types
export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface LocationInfo {
  coordinates: Coordinates;
  city?: string;
  country?: string;
  timezone?: string;
  source: 'gps' | 'manual' | 'cache' | 'default';
}

// App state types
export type AppLanguage = 'fr' | 'ar' | 'en';
export type AppTheme = 'light' | 'dark' | 'auto';

export interface AppSettings {
  language: AppLanguage;
  theme: AppTheme;
  firstLaunch: boolean;
}
