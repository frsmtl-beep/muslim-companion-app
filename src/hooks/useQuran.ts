import { useState, useEffect, useCallback } from 'react';
import { Surah, QuranFavorite } from '../types/quran';
import { quranService } from '../services/quran.service';

interface UseQuranResult {
  surahs: Surah[];
  favorites: QuranFavorite[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredSurahs: Surah[];
  toggleFavorite: (surah: number, ayah: number, text: string) => Promise<void>;
  isFavorite: (surah: number, ayah: number) => boolean;
  refreshFavorites: () => Promise<void>;
}

export function useQuran(): UseQuranResult {
  const [surahs] = useState<Surah[]>(quranService.getAllSurahs());
  const [favorites, setFavorites] = useState<QuranFavorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = searchQuery.trim()
    ? quranService.searchSurahs(searchQuery)
    : surahs;

  const refreshFavorites = useCallback(async () => {
    setLoading(true);
    const favs = await quranService.getFavorites();
    setFavorites(favs);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  const isFavorite = (surah: number, ayah: number) =>
    favorites.some((f) => f.surah === surah && f.ayah === ayah);

  const toggleFavorite = async (surah: number, ayah: number, text: string) => {
    if (isFavorite(surah, ayah)) {
      await quranService.removeFavorite(surah, ayah);
    } else {
      await quranService.addFavorite({ surah, ayah, text });
    }
    await refreshFavorites();
  };

  return {
    surahs,
    favorites,
    loading,
    searchQuery,
    setSearchQuery,
    filteredSurahs,
    toggleFavorite,
    isFavorite,
    refreshFavorites,
  };
}
