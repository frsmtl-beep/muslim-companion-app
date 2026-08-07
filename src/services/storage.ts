import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheEntry<T> {
  data: T;
  expiresAt: number | null;
}

export const storageService = {
  async setItem<T>(key: string, value: T, ttlMs?: number): Promise<void> {
    const entry: CacheEntry<T> = {
      data: value,
      expiresAt: ttlMs ? Date.now() + ttlMs : null,
    };
    await AsyncStorage.setItem(key, JSON.stringify(entry));
  },

  async getItem<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    try {
      const entry: CacheEntry<T> = JSON.parse(raw);
      if (entry.expiresAt && Date.now() > entry.expiresAt) {
        await AsyncStorage.removeItem(key);
        return null;
      }
      return entry.data;
    } catch {
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  },

  async getAllKeys(): Promise<readonly string[]> {
    return AsyncStorage.getAllKeys();
  },
};
