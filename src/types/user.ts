// Types: User
export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  userId: string;
  language: 'fr' | 'ar' | 'en';
  calculationMethod: number;
  asrCalculation: 'Standard' | 'Hanafi';
  madhab: 'Shafi' | 'Hanafi';
  prayerAdjustments: Record<string, number>;
  notificationsEnabled: boolean;
  notificationSettings: Record<string, PrayerNotificationSetting>;
  defaultCity?: string;
  defaultLatitude?: number;
  defaultLongitude?: number;
  timezone?: string;
  theme: 'light' | 'dark' | 'auto';
  createdAt: string;
  updatedAt: string;
}

export interface PrayerNotificationSetting {
  enabled: boolean;
  minutesBefore: number; // 0 = at prayer time, 10 = 10 min before
}

export interface AuthState {
  user: UserProfile | null;
  session: unknown | null;
  loading: boolean;
  error: string | null;
}
