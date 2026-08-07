import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrayerTime } from '../types/prayer';
import { PRAYER_NAMES_FR, PRAYER_COLORS } from '../constants/prayers';
import { formatPrayerTime } from '../utils/formatting';

interface PrayerCardProps {
  prayer: PrayerTime;
  isNext?: boolean;
  use12h?: boolean;
}

export function PrayerCard({ prayer, isNext = false, use12h = false }: PrayerCardProps) {
  const color = PRAYER_COLORS[prayer.name] ?? '#1a3a5c';
  const label = PRAYER_NAMES_FR[prayer.name] ?? prayer.name;
  const timeStr = formatPrayerTime(prayer.time, use12h);

  return (
    <View style={[styles.card, isNext && styles.cardNext, { borderLeftColor: color }]}>
      <View style={styles.left}>
        <Text style={[styles.name, isNext && styles.nameNext]}>{label}</Text>
        {isNext && <Text style={styles.badge}>Prochaine</Text>}
      </View>
      <Text style={[styles.time, isNext && styles.timeNext]}>{timeStr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardNext: {
    backgroundColor: '#1a3a5c',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  nameNext: {
    color: '#ffffff',
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#4caf50',
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a3a5c',
  },
  timeNext: {
    color: '#ffffff',
  },
});
