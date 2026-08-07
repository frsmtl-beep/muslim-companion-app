// Types: Quran
export interface Surah {
  number: number;
  name: string;         // Arabic name
  englishName: string;
  englishNameTranslation: string;
  frenchName: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;           // global ayah number (1-6236)
  surah: number;
  numberInSurah: number;
  text: string;             // Arabic text
  transliteration?: string;
  translation?: {
    fr?: string;
    en?: string;
    ar?: string;
  };
  juz: number;
  page: number;
  isFavorite?: boolean;
}

export interface QuranReadingProgress {
  lastSurah: number;
  lastAyah: number;
  totalAyahsRead: number;
  timestamp: number;
}

export interface QuranFavorite {
  surah: number;
  ayah: number;
  text: string;
  translation?: string;
  note?: string;
  createdAt: number;
}

export interface QuranBookmark {
  surah: number;
  ayah: number;
  note?: string;
  createdAt: number;
}
