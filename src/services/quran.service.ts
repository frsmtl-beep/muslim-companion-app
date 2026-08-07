import { SURAHS } from '../constants/quran';
import { Surah, QuranFavorite, QuranBookmark, QuranReadingProgress } from '../types/quran';
import { storageService } from './storage';
import { STORAGE_KEYS } from '../constants/settings';

export function getAllSurahs(): Surah[] {
  return SURAHS;
}

export function getSurahByNumber(number: number): Surah | undefined {
  return SURAHS.find((s) => s.number === number);
}

export function searchSurahs(query: string): Surah[] {
  const q = query.toLowerCase().trim();
  if (!q) return SURAHS;
  return SURAHS.filter(
    (s) =>
      s.englishName.toLowerCase().includes(q) ||
      s.frenchName.toLowerCase().includes(q) ||
      s.name.includes(q) ||
      s.number.toString() === q,
  );
}

// ─── Favorites ────────────────────────────────────────────────────────────────
export async function getFavorites(): Promise<QuranFavorite[]> {
  return (await storageService.getItem<QuranFavorite[]>(STORAGE_KEYS.QURAN_FAVORITES)) ?? [];
}

export async function addFavorite(fav: Omit<QuranFavorite, 'createdAt'>): Promise<void> {
  const favorites = await getFavorites();
  const exists = favorites.some((f) => f.surah === fav.surah && f.ayah === fav.ayah);
  if (!exists) {
    favorites.push({ ...fav, createdAt: Date.now() });
    await storageService.setItem(STORAGE_KEYS.QURAN_FAVORITES, favorites);
  }
}

export async function removeFavorite(surah: number, ayah: number): Promise<void> {
  const favorites = await getFavorites();
  const updated = favorites.filter((f) => !(f.surah === surah && f.ayah === ayah));
  await storageService.setItem(STORAGE_KEYS.QURAN_FAVORITES, updated);
}

// ─── Bookmarks ────────────────────────────────────────────────────────────────
export async function getBookmarks(): Promise<QuranBookmark[]> {
  return (await storageService.getItem<QuranBookmark[]>(STORAGE_KEYS.QURAN_BOOKMARKS)) ?? [];
}

export async function addBookmark(bookmark: Omit<QuranBookmark, 'createdAt'>): Promise<void> {
  const bookmarks = await getBookmarks();
  const exists = bookmarks.some((b) => b.surah === bookmark.surah && b.ayah === bookmark.ayah);
  if (!exists) {
    bookmarks.push({ ...bookmark, createdAt: Date.now() });
    await storageService.setItem(STORAGE_KEYS.QURAN_BOOKMARKS, bookmarks);
  }
}

// ─── Reading progress ─────────────────────────────────────────────────────────
export async function getReadingProgress(): Promise<QuranReadingProgress | null> {
  return storageService.getItem<QuranReadingProgress>(STORAGE_KEYS.QURAN_PROGRESS);
}

export async function saveReadingProgress(surah: number, ayah: number): Promise<void> {
  const existing = await getReadingProgress();
  const progress: QuranReadingProgress = {
    lastSurah: surah,
    lastAyah: ayah,
    totalAyahsRead: (existing?.totalAyahsRead ?? 0) + 1,
    timestamp: Date.now(),
  };
  await storageService.setItem(STORAGE_KEYS.QURAN_PROGRESS, progress);
}

export const quranService = {
  getAllSurahs,
  getSurahByNumber,
  searchSurahs,
  getFavorites,
  addFavorite,
  removeFavorite,
  getBookmarks,
  addBookmark,
  getReadingProgress,
  saveReadingProgress,
};
