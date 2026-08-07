import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ayah } from '../types/quran';

interface QuranReaderProps {
  ayahs: Ayah[];
  onFavoriteToggle?: (ayah: Ayah) => void;
  isFavorite?: (surah: number, ayah: number) => boolean;
  darkMode?: boolean;
  fontSize?: number;
}

export function QuranReader({
  ayahs,
  onFavoriteToggle,
  isFavorite,
  darkMode = false,
  fontSize = 24,
}: QuranReaderProps) {
  const bg = darkMode ? '#0d1117' : '#fafaf7';
  const textColor = darkMode ? '#e6d5b8' : '#2c2c2c';
  const verseNumColor = darkMode ? '#4caf50' : '#1a3a5c';
  const translationColor = darkMode ? '#a8a8a8' : '#555';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      {ayahs.map((ayah) => {
        const fav = isFavorite?.(ayah.surah, ayah.numberInSurah) ?? false;
        return (
          <View key={ayah.number} style={[styles.ayahContainer, darkMode && styles.ayahDark]}>
            {/* Verse number badge */}
            <View style={styles.verseRow}>
              <View style={[styles.verseNum, { borderColor: verseNumColor }]}>
                <Text style={[styles.verseNumText, { color: verseNumColor }]}>
                  {ayah.numberInSurah}
                </Text>
              </View>
              {onFavoriteToggle ? (
                <TouchableOpacity onPress={() => onFavoriteToggle(ayah)}>
                  <Text style={styles.favBtn}>{fav ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Arabic text */}
            <Text
              style={[styles.arabicText, { color: textColor, fontSize }]}
              textBreakStrategy="highQuality"
            >
              {ayah.text}
            </Text>

            {/* Translation */}
            {ayah.translation?.fr ? (
              <Text style={[styles.translation, { color: translationColor }]}>
                {ayah.translation.fr}
              </Text>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ayahContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  ayahDark: {
    borderBottomColor: '#2a2a2a',
  },
  verseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  verseNum: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verseNumText: {
    fontSize: 12,
    fontWeight: '700',
  },
  favBtn: {
    fontSize: 18,
  },
  arabicText: {
    textAlign: 'right',
    lineHeight: 48,
    writingDirection: 'rtl',
    fontFamily: 'serif',
  },
  translation: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
