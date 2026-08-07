import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLocation } from '../../src/hooks/useLocation';
import { LocationSelector } from '../../src/components/LocationSelector';
import { LocationInfo } from '../../src/types';

const STEPS = ['welcome', 'location', 'done'] as const;
type Step = typeof STEPS[number];

export default function OnboardingScreen() {
  const [step, setStep] = useState<Step>('welcome');
  const { setManualLocation } = useLocation();

  const handleLocationSelect = async (loc: LocationInfo) => {
    await setManualLocation(loc);
    setStep('done');
  };

  if (step === 'welcome') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emoji}>🌙</Text>
          <Text style={styles.title}>Muslim Companion</Text>
          <Text style={styles.subtitle}>
            Votre compagnon islamique quotidien.{'\n'}
            Horaires de prière, Coran, direction de la Qibla.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={() => setStep('location')}>
            <Text style={styles.btnText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 'location') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.locationHeader}>
          <Text style={styles.locationTitle}>Choisissez votre ville</Text>
          <Text style={styles.locationSub}>Pour des horaires de prière précis</Text>
        </View>
        <LocationSelector onSelect={handleLocationSelect} />
        <TouchableOpacity style={styles.skipBtn} onPress={() => setStep('done')}>
          <Text style={styles.skipText}>Passer (utiliser la géolocalisation)</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.title}>Tout est prêt !</Text>
        <Text style={styles.subtitle}>
          Votre application est configurée.{'\n'}
          Bonne lecture et bonnes prières !
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.btnText}>Entrer dans l'application</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1a3a5c' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#a8c4e0', textAlign: 'center', marginTop: 12, lineHeight: 22 },
  btn: {
    marginTop: 32, backgroundColor: '#4caf50', borderRadius: 14,
    paddingHorizontal: 32, paddingVertical: 14,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  locationHeader: { padding: 20, backgroundColor: '#1a3a5c' },
  locationTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  locationSub: { fontSize: 13, color: '#a8c4e0', marginTop: 4 },
  skipBtn: { padding: 16, alignItems: 'center' },
  skipText: { color: '#7f8c8d', fontSize: 13 },
});
