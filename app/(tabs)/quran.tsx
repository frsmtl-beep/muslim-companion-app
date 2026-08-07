import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuran } from '../../src/hooks/useQuran';
import { Surah } from '../../src/types/quran';

export default function QuranScreen() {
  const { filteredSurahs, searchQuery, setSearchQuery } = useQuran();
  const [darkMode, setDarkMode] = useState(false);

  const bg = darkMode ? '#0d1117' : '#f0f4ff';
  const cardBg = darkMode ? '#1a1a2e' : '#ffffff';
  const textColor = darkMode ? '#e6d5b8' : '#2c3e50';
  const subColor = darkMode ? '#888' : '#7f8c8d';

  const renderSurah = ({ item }: { item: Surah }) => (
    <TouchableOpacity style={[styles.surahCard, { backgroundColor: cardBg }]}>
      <View style={[styles.surahNum, { borderColor: textColor }]}>
        <Text style={[styles.surahNumText, { color: textColor }]}>{item.number}</Text>
      </View>
      <View style={styles.surahInfo}>
        <Text style={[styles.surahEnglish, { color: textColor }]}>{item.frenchName}</Text>
        <Text style={[styles.surahSub, { color: subColor }]}>
          {item.numberOfAyahs} versets · {item.revelationType === 'Meccan' ? 'Mecquoise' : 'Médinoise'}
        </Text>
      </View>
      <Text style={[styles.surahArabic, { color: textColor }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: darkMode ? '#0d1117' : '#1a3a5c' }]}>
        <Text style={styles.title}>Coran</Text>
        <TouchableOpacity onPress={() => setDarkMode((v) => !v)}>
          <Text style={styles.darkBtn}>{darkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.search, { backgroundColor: cardBg, color: textColor }]}
        placeholder="Rechercher une sourate..."
        placeholderTextColor={subColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredSurahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={renderSurah}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: darkMode ? '#222' : '#f0f4ff' }]} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  darkBtn: { fontSize: 20 },
  search: {
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#dde3ed',
  },
  list: { paddingHorizontal: 12, paddingBottom: 32 },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
  },
  surahNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  surahNumText: { fontSize: 12, fontWeight: '700' },
  surahInfo: { flex: 1 },
  surahEnglish: { fontSize: 15, fontWeight: '600' },
  surahSub: { fontSize: 12, marginTop: 2 },
  surahArabic: { fontSize: 18, fontWeight: '600', fontFamily: 'serif' },
  sep: { height: 1, marginHorizontal: 14 },
});
