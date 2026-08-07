import { CalculationMethod } from '../types/prayer';

export const CALCULATION_METHODS: CalculationMethod[] = [
  { id: 0, name: 'Shia Ithna-Ansari', nameAr: 'الشيعة الإثني عشرية', region: 'Iran' },
  { id: 1, name: 'University of Islamic Sciences, Karachi', nameAr: 'جامعة العلوم الإسلامية، كراتشي', region: 'Pakistan' },
  { id: 2, name: 'Islamic Society of North America (ISNA)', nameAr: 'الجمعية الإسلامية لأمريكا الشمالية', region: 'North America' },
  { id: 3, name: 'Muslim World League', nameAr: 'رابطة العالم الإسلامي', region: 'Global' },
  { id: 4, name: 'Umm Al-Qura University, Makkah', nameAr: 'جامعة أم القرى، مكة', region: 'Saudi Arabia' },
  { id: 5, name: 'Egyptian General Authority of Survey', nameAr: 'الهيئة المصرية العامة للمساحة', region: 'Egypt' },
  { id: 7, name: 'Institute of Geophysics, University of Tehran', nameAr: 'معهد الجيوفيزياء، جامعة طهران', region: 'Iran' },
  { id: 8, name: 'Gulf Region', nameAr: 'منطقة الخليج', region: 'Gulf' },
  { id: 9, name: 'Kuwait', nameAr: 'الكويت', region: 'Kuwait' },
  { id: 10, name: 'Qatar', nameAr: 'قطر', region: 'Qatar' },
  { id: 11, name: 'Majlis Ugama Islam Singapura, Singapore', nameAr: 'مجلس الأئمة الإسلامي سنغافورة', region: 'Singapore' },
  { id: 12, name: 'Union Organization Islamic de France', nameAr: 'الاتحاد الإسلامي في فرنسا', region: 'France' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey', nameAr: 'رئاسة الشؤون الدينية، تركيا', region: 'Turkey' },
  { id: 14, name: 'Spiritual Administration of Muslims of Russia', nameAr: 'الإدارة الروحية لمسلمي روسيا', region: 'Russia' },
  { id: 15, name: 'Moonsighting Committee Worldwide', nameAr: 'لجنة رؤية الهلال العالمية', region: 'Global' },
];

export const DEFAULT_CALCULATION_METHOD_ID = 2; // ISNA - good for North America

export const PRAYER_NAMES_FR: Record<string, string> = {
  Fajr: 'Fajr (Aube)',
  Sunrise: 'Lever du soleil',
  Dhuhr: 'Dhuhr (Midi)',
  Asr: 'Asr (Après-midi)',
  Maghrib: 'Maghrib (Coucher)',
  Isha: 'Isha (Nuit)',
};

export const PRAYER_NAMES_AR: Record<string, string> = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

export const PRAYER_COLORS: Record<string, string> = {
  Fajr: '#5c7bd4',
  Sunrise: '#f5a623',
  Dhuhr: '#e8c547',
  Asr: '#e07b39',
  Maghrib: '#c0392b',
  Isha: '#2c3e50',
};

export const MAIN_PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
