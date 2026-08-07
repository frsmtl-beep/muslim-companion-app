// Environment variables - all EXPO_PUBLIC_ prefix for client-side access

const ENV = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  aladhanApiBase: process.env.EXPO_PUBLIC_ALADHAN_API_BASE ?? 'https://api.aladhan.com/v1',
  appEnv: (process.env.EXPO_PUBLIC_APP_ENV ?? 'development') as 'development' | 'staging' | 'production',
} as const;

export default ENV;
