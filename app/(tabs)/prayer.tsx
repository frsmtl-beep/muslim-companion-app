import React, { useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet, ActivityIndicator,
  TouchableOpacity, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocation } from '../../src/hooks/useLocation';
import { usePrayers } from '../../src/hooks/usePrayers';
import { useQibla } from '../../src/hooks/useQibla';
import { PrayerCard } from '../../src/components/PrayerCard';
import { QiblaCompass } from '../../src/components/QiblaCompass';
import { LocationSelector } from '../../src/components/LocationSelector';
import { CalculationMethodSelector } from '../../src/components/CalculationMethod';
import { usePrayerStore } from '../../src/state';
import { LocationInfo } from '../../src/types';
import { CalculationMethodId } from '../../src/types/prayer';

type ModalView = 'location' | 'method' | null;

export default function PrayerScreen() {
  const { location, setManualLocation } = useLocation();
  const { calculationMethod, setCalculationMethod } = usePrayerStore();
  const { prayerTimes, loading, error, refresh } = usePrayers(location, calculationMethod);
  const { qiblaDirection } = useQibla(
    location?.coordinates.latitude ?? null,
    location?.coordinates.longitude ?? null,
  );
  const [modal, setModal] = useState<ModalView>(null);
  const [showQibla, setShowQibla] = useState(false);

  const handleSelectLocation = async (loc: LocationInfo) => {
    await setManualLocation(loc);
    setModal(null);
    refresh();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Prières</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.btn} onPress={() => setModal('location')}>
            <Text style={styles.btnText}>📍 Ville</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => setModal('method')}>
            <Text style={styles.btnText}>⚙️ Méthode</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {location?.city && (
          <Text style={styles.locationLabel}>
            📍 {location.city}{location.country ? `, ${location.country}` : ''}
          </Text>
        )}

        {loading && <ActivityIndicator size="large" color="#1a3a5c" style={{ marginTop: 40 }} />}
        {error && <Text style={styles.error}>{error}</Text>}

        {prayerTimes && (
          <View style={styles.section}>
            {prayerTimes.prayers.map((prayer) => (
              <PrayerCard key={prayer.name} prayer={prayer} />
            ))}
          </View>
        )}

        {/* Qibla section */}
        <TouchableOpacity style={styles.qiblaToggle} onPress={() => setShowQibla((v) => !v)}>
          <Text style={styles.qiblaToggleText}>🧭 Direction de la Qibla {showQibla ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showQibla && qiblaDirection !== null && (
          <View style={styles.qiblaCard}>
            <QiblaCompass qiblaDirection={qiblaDirection} />
          </View>
        )}
      </ScrollView>

      {/* Location modal */}
      <Modal visible={modal === 'location'} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choisir une ville</Text>
            <TouchableOpacity onPress={() => setModal(null)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <LocationSelector onSelect={handleSelectLocation} onClose={() => setModal(null)} />
        </SafeAreaView>
      </Modal>

      {/* Calculation method modal */}
      <Modal visible={modal === 'method'} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Méthode de calcul</Text>
            <TouchableOpacity onPress={() => setModal(null)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <CalculationMethodSelector
            selected={calculationMethod as CalculationMethodId}
            onChange={(id) => { setCalculationMethod(id); setModal(null); refresh(); }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f4ff' },
  header: { backgroundColor: '#1a3a5c', paddingHorizontal: 20, paddingVertical: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  headerActions: { flexDirection: 'row', gap: 8, marginTop: 10 },
  btn: { backgroundColor: '#2c4f7a', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  locationLabel: { fontSize: 13, color: '#1a3a5c', marginBottom: 12 },
  error: { color: '#e74c3c', textAlign: 'center', marginTop: 20 },
  section: { marginBottom: 16 },
  qiblaToggle: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  qiblaToggleText: { fontSize: 15, fontWeight: '600', color: '#1a3a5c' },
  qiblaCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e8f0',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1a3a5c' },
  modalClose: { fontSize: 18, color: '#7f8c8d', paddingHorizontal: 4 },
});
