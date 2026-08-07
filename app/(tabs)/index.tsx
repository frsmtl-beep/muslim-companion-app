import React from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocation } from '../../src/hooks/useLocation';
import { usePrayers } from '../../src/hooks/usePrayers';
import { PrayerCard } from '../../src/components/PrayerCard';
import { CountdownTimer } from '../../src/components/CountdownTimer';
import { prayerService } from '../../src/services/prayer.service';
import { formatDate } from '../../src/utils/formatting';

export default function TodayScreen() {
  const { location, loading: locLoading } = useLocation();
  const { prayerTimes, loading: prayerLoading, error } = usePrayers(location);

  const loading = locLoading || prayerLoading;

  const nextPrayer = prayerTimes
    ? prayerService.getNextPrayer(prayerTimes.prayers)
    : null;

  const today = formatDate(new Date());

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>Muslim Companion</Text>
        <Text style={styles.date}>{today}</Text>
        {location?.city ? (
          <Text style={styles.location}>📍 {location.city}{location.country ? `, ${location.country}` : ''}</Text>
        ) : null}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {loading && (
          <ActivityIndicator size="large" color="#1a3a5c" style={styles.loader} />
        )}

        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        {/* Next prayer countdown */}
        {nextPrayer && (
          <View style={styles.countdownCard}>
            <Text style={styles.countdownLabel}>Prochaine prière</Text>
            <Text style={styles.countdownPrayer}>{nextPrayer.prayer.name}</Text>
            <CountdownTimer
              targetTimestamp={nextPrayer.prayer.timestamp}
              style={styles.countdown}
            />
            <Text style={styles.countdownTime}>{nextPrayer.prayer.time}</Text>
          </View>
        )}

        {/* Prayer list (today) */}
        {prayerTimes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horaires du jour</Text>
            {prayerTimes.prayers.map((prayer) => (
              <PrayerCard
                key={prayer.name}
                prayer={prayer}
                isNext={nextPrayer?.prayer.name === prayer.name}
              />
            ))}
          </View>
        )}

        {/* Ayah of the day placeholder */}
        <View style={styles.ayahCard}>
          <Text style={styles.ayahLabel}>Ayah du jour</Text>
          <Text style={styles.ayahArabic}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          <Text style={styles.ayahTranslation}>
            Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux
          </Text>
          <Text style={styles.ayahRef}>Al-Fatihah 1:1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f4ff' },
  header: {
    backgroundColor: '#1a3a5c',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  appName: { fontSize: 22, fontWeight: '800', color: '#fff' },
  date: { fontSize: 14, color: '#a8c4e0', marginTop: 2 },
  location: { fontSize: 12, color: '#7db3d8', marginTop: 4 },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  loader: { marginTop: 40 },
  error: { color: '#e74c3c', textAlign: 'center', marginTop: 20 },
  countdownCard: {
    backgroundColor: '#1a3a5c',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  countdownLabel: { color: '#a8c4e0', fontSize: 13, marginBottom: 4 },
  countdownPrayer: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  countdown: { color: '#fff', fontSize: 36, fontWeight: '800', letterSpacing: 2 },
  countdownTime: { color: '#a8c4e0', fontSize: 14, marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1a3a5c', marginBottom: 8 },
  ayahCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  ayahLabel: { fontSize: 12, color: '#7f8c8d', fontWeight: '600', marginBottom: 10 },
  ayahArabic: { fontSize: 22, textAlign: 'right', color: '#2c3e50', lineHeight: 40, writingDirection: 'rtl' },
  ayahTranslation: { fontSize: 13, color: '#555', fontStyle: 'italic', marginTop: 8 },
  ayahRef: { fontSize: 11, color: '#1a3a5c', fontWeight: '600', marginTop: 6 },
});
