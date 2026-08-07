import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import { useSettingsStore } from '../../src/state';
import { MAIN_PRAYERS } from '../../src/constants/prayers';
import { AppLanguage, AppTheme } from '../../src/types';

export default function ProfileScreen() {
  const { user, signOut, loading } = useAuth();
  const { language, theme, notificationsEnabled, enabledPrayers, setLanguage, setTheme, setNotificationsEnabled, togglePrayerNotification } = useSettingsStore();
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleSignOut = () => {
    Alert.alert('Déconnexion', 'Voulez-vous vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Déconnecter', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Auth section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          {user ? (
            <View style={styles.card}>
              <Text style={styles.email}>{user.email}</Text>
              <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Se déconnecter</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.guestText}>Mode invité – pas de synchronisation</Text>
              <TouchableOpacity style={styles.signInBtn} onPress={() => setShowAuthForm(true)}>
                <Text style={styles.signInText}>Se connecter / S'inscrire</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Langue</Text>
          <View style={styles.card}>
            {(['fr', 'ar', 'en'] as AppLanguage[]).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.langBtn, language === lang && styles.langBtnActive]}
                onPress={() => setLanguage(lang)}
              >
                <Text style={[styles.langText, language === lang && styles.langTextActive]}>
                  {lang === 'fr' ? '🇫🇷 Français' : lang === 'ar' ? '🇸🇦 العربية' : '🇬🇧 English'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Theme */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thème</Text>
          <View style={styles.card}>
            {(['light', 'dark', 'auto'] as AppTheme[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.langBtn, theme === t && styles.langBtnActive]}
                onPress={() => setTheme(t)}
              >
                <Text style={[styles.langText, theme === t && styles.langTextActive]}>
                  {t === 'light' ? '☀️ Clair' : t === 'dark' ? '🌙 Sombre' : '⚙️ Automatique'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Notifications activées</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#ccc', true: '#1a3a5c' }}
              />
            </View>
            {notificationsEnabled && MAIN_PRAYERS.map((prayer) => (
              <View key={prayer} style={[styles.row, styles.rowBorder]}>
                <Text style={styles.rowLabel}>{prayer}</Text>
                <Switch
                  value={enabledPrayers[prayer] ?? true}
                  onValueChange={() => togglePrayerNotification(prayer)}
                  trackColor={{ false: '#ccc', true: '#4caf50' }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f4ff' },
  header: { backgroundColor: '#1a3a5c', paddingHorizontal: 20, paddingVertical: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#7f8c8d', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 },
  card: { backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  email: { fontSize: 15, fontWeight: '600', color: '#1a3a5c', marginBottom: 12 },
  signOutBtn: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, backgroundColor: '#fde8e8', borderRadius: 8 },
  signOutText: { color: '#e74c3c', fontWeight: '600', fontSize: 13 },
  guestText: { color: '#7f8c8d', fontSize: 13, marginBottom: 12 },
  signInBtn: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#1a3a5c', borderRadius: 8 },
  signInText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  langBtn: { paddingVertical: 10, paddingHorizontal: 4, marginBottom: 4, borderRadius: 8 },
  langBtnActive: { backgroundColor: '#e8f0fb' },
  langText: { fontSize: 14, color: '#2c3e50' },
  langTextActive: { color: '#1a3a5c', fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  rowBorder: { borderTopWidth: 1, borderTopColor: '#f0f4ff' },
  rowLabel: { fontSize: 14, color: '#2c3e50' },
});
