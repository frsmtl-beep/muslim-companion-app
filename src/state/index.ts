import { create } from 'zustand';
import { LocationInfo, AppLanguage, AppTheme } from '../types';
import { PrayerTimes } from '../types/prayer';
import { DEFAULT_CALCULATION_METHOD_ID, MAIN_PRAYERS } from '../constants/prayers';
import { DEFAULT_USER_PREFERENCES } from '../constants/settings';

// ─── Location Store ───────────────────────────────────────────────────────────
interface LocationStore {
  location: LocationInfo | null;
  setLocation: (location: LocationInfo) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
  clearLocation: () => set({ location: null }),
}));

// ─── Prayer Store ─────────────────────────────────────────────────────────────
interface PrayerStore {
  prayerTimes: PrayerTimes | null;
  calculationMethod: number;
  adjustments: Record<string, number>;
  setPrayerTimes: (times: PrayerTimes) => void;
  setCalculationMethod: (id: number) => void;
  setAdjustment: (prayer: string, minutes: number) => void;
}

export const usePrayerStore = create<PrayerStore>((set) => ({
  prayerTimes: null,
  calculationMethod: DEFAULT_CALCULATION_METHOD_ID,
  adjustments: { ...DEFAULT_USER_PREFERENCES.prayerAdjustments },
  setPrayerTimes: (prayerTimes) => set({ prayerTimes }),
  setCalculationMethod: (calculationMethod) => set({ calculationMethod }),
  setAdjustment: (prayer, minutes) =>
    set((s) => ({ adjustments: { ...s.adjustments, [prayer]: minutes } })),
}));

// ─── Settings Store ───────────────────────────────────────────────────────────
interface SettingsStore {
  language: AppLanguage;
  theme: AppTheme;
  notificationsEnabled: boolean;
  notificationMinutesBefore: Record<string, number>;
  enabledPrayers: Record<string, boolean>;
  setLanguage: (language: AppLanguage) => void;
  setTheme: (theme: AppTheme) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setNotificationMinutes: (prayer: string, minutes: number) => void;
  togglePrayerNotification: (prayer: string) => void;
}

const initialEnabledPrayers = Object.fromEntries(MAIN_PRAYERS.map((p) => [p, true]));
const initialMinutes = Object.fromEntries(MAIN_PRAYERS.map((p) => [p, 10]));

export const useSettingsStore = create<SettingsStore>((set) => ({
  language: 'fr',
  theme: 'auto',
  notificationsEnabled: true,
  notificationMinutesBefore: initialMinutes,
  enabledPrayers: initialEnabledPrayers,
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
  setNotificationMinutes: (prayer, minutes) =>
    set((s) => ({ notificationMinutesBefore: { ...s.notificationMinutesBefore, [prayer]: minutes } })),
  togglePrayerNotification: (prayer) =>
    set((s) => ({
      enabledPrayers: { ...s.enabledPrayers, [prayer]: !s.enabledPrayers[prayer] },
    })),
}));
