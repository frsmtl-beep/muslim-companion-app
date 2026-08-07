import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { storageService } from '../src/services/storage';
import { STORAGE_KEYS } from '../src/constants/settings';

export default function SplashScreen() {
  useEffect(() => {
    const init = async () => {
      await new Promise((r) => setTimeout(r, 1500)); // brief splash
      const firstLaunch = !(await storageService.getItem(STORAGE_KEYS.FIRST_LAUNCH));
      if (firstLaunch) {
        await storageService.setItem(STORAGE_KEYS.FIRST_LAUNCH, true);
        router.replace('/auth/onboarding');
      } else {
        router.replace('/(tabs)');
      }
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌙</Text>
      <Text style={styles.name}>Muslim Companion</Text>
      <ActivityIndicator color="#a8c4e0" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3a5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 72, marginBottom: 16 },
  name: { fontSize: 26, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  loader: { marginTop: 40 },
});
