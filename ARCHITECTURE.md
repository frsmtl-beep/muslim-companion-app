# Architecture — Muslim Companion App

## Overview

Muslim Companion is a React Native mobile application built with Expo. It follows a clean layered architecture:

```
UI (Expo Router Screens)
    ↓
Hooks (business logic + state)
    ↓
Services (API calls, local storage, device APIs)
    ↓
External systems (Supabase, AlAdhan API, adhan-js, expo-location)
```

## Directory Structure

```
app/                    Expo Router file-system navigation
  (tabs)/               Main tab screens (Today, Prayer, Quran, Profile)
  auth/                 Auth screens (Login, Signup, Onboarding)
  _layout.tsx           Root layout
  splash.tsx            Loading/splash screen

src/
  config/               Environment & Supabase client configuration
  services/             Data fetching, caching, device APIs
  hooks/                Custom React hooks (consume services, expose to screens)
  components/           Reusable UI components
  constants/            Static data (calculation methods, surahs, cities, defaults)
  types/                TypeScript type definitions
  utils/                Pure utility functions (formatting, math, validation)
  state/                Zustand global stores (location, prayer, settings)
```

## Prayer Times Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                  getPrayerTimes()                             │
│                                                              │
│  1. Check AsyncStorage cache (24h TTL)                       │
│         ↓ miss                                               │
│  2. Call AlAdhan API (HTTP)                                  │
│         ↓ error / timeout                                    │
│  3. Calculate locally with adhan-js                          │
│         ↓ always                                             │
│  4. Apply manual ±minutes adjustments                        │
│  5. Cache result                                             │
└──────────────────────────────────────────────────────────────┘
```

## Geolocation Strategy

```
Priority 1: AsyncStorage cache (1h TTL)
Priority 2: GPS via expo-location (request permission)
Priority 3: Default location (Montréal, QC, Canada)

Manual override: user selects city from CITIES list
  → saved to AsyncStorage as 'manual' source
```

## State Management

Three Zustand stores:

| Store | Contents |
|-------|----------|
| `useLocationStore` | Current location info |
| `usePrayerStore` | Prayer times, calculation method, adjustments |
| `useSettingsStore` | Language, theme, notification settings |

Supabase Auth state is managed locally in `useAuth` hook via Supabase SDK subscription.

## Supabase Schema (target)

```sql
-- Users (extends auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User preferences
CREATE TABLE user_preferences (
  user_id UUID REFERENCES users PRIMARY KEY,
  language TEXT DEFAULT 'fr',
  calculation_method INT DEFAULT 2,
  asr_calculation TEXT DEFAULT 'Standard',
  prayer_adjustments JSONB DEFAULT '{}',
  notifications_enabled BOOL DEFAULT true,
  notification_settings JSONB DEFAULT '{}',
  default_city TEXT,
  default_latitude FLOAT,
  default_longitude FLOAT,
  timezone TEXT,
  theme TEXT DEFAULT 'auto',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Prayer cache (optional server-side cache)
CREATE TABLE prayer_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users,
  date DATE NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  method INT NOT NULL,
  timings JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only read/write their own rows
- Supabase anon key is public (safe — RLS enforces authorization)
- No server secrets exposed in client bundle

## Notification Architecture

- Local notifications only (no push server required for MVP)
- Scheduled via `expo-notifications` at prayer time - N minutes
- Re-scheduled when: prayer times refresh, settings change
- Identifiers: `prayer_{name}_{timestamp}` for easy cancellation

## Phase 2 Additions

- Quran audio playback (Supabase Storage)
- Sentry crash reporting
- PostHog analytics
- Hijri calendar
- Adhkar (morning/evening supplications)
- Ramadan mode
- Home screen widget
