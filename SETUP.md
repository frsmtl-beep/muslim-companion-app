# Setup Guide — Supabase & Environment

## 1. Supabase Project Setup

### Create your project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project (name: `muslim-companion-prod` or `muslim-companion-dev`)
3. Choose a strong database password and save it securely
4. Select the region closest to your users (e.g., `us-east-1` for North America)

### Get your credentials

After your project is created, go to **Project Settings → API**:

- `Project URL` → `EXPO_PUBLIC_SUPABASE_URL`
- `anon public` key → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Create the database schema

Run the following SQL in the **SQL Editor** tab:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  language TEXT NOT NULL DEFAULT 'fr',
  calculation_method INT NOT NULL DEFAULT 2,
  asr_calculation TEXT NOT NULL DEFAULT 'Standard',
  prayer_adjustments JSONB NOT NULL DEFAULT '{}',
  notifications_enabled BOOLEAN NOT NULL DEFAULT true,
  notification_settings JSONB NOT NULL DEFAULT '{}',
  default_city TEXT,
  default_latitude FLOAT,
  default_longitude FLOAT,
  timezone TEXT,
  theme TEXT NOT NULL DEFAULT 'auto',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prayer cache (server-side cache for offline fallback sync)
CREATE TABLE IF NOT EXISTS public.prayer_cache (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  method INT NOT NULL,
  timings JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date, latitude, longitude, method)
);
```

### Enable Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_cache ENABLE ROW LEVEL SECURITY;

-- Users: own row only
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Preferences: own row only
CREATE POLICY "Users can manage own preferences"
  ON public.user_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Prayer cache: own rows only
CREATE POLICY "Users can manage own prayer cache"
  ON public.prayer_cache FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### Auto-create user profile on signup

```sql
-- Function: create user profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name'
  );

  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=******
EXPO_PUBLIC_ALADHAN_API_BASE=https://api.aladhan.com/v1
EXPO_PUBLIC_APP_ENV=development
```

> **Important**: Never commit `.env.local` — it is in `.gitignore`.

---

## 3. Storage Bucket (Phase 2)

For Quran audio (Phase 2), create a bucket in **Storage** tab:

- Name: `quran-audio`
- Public: No (authenticated access)
- Allowed MIME types: `audio/mpeg, audio/mp4`

---

## 4. Auth Configuration

In **Authentication → Settings**:

- Site URL: `muslimcompanion://`
- Redirect URLs: `muslimcompanion://auth/callback`
- Enable email confirmations: Yes (production) / No (development)

---

## 5. Development vs Production

Create two Supabase projects:

| Project | Usage |
|---------|-------|
| `muslim-companion-dev` | Local development |
| `muslim-companion-prod` | Production (Play Store / App Store) |

Switch between them by changing `.env.local`.
