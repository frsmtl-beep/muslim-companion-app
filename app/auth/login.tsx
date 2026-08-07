import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { isValidEmail, isValidPassword } from '../../src/utils/validation';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading, error } = useAuth();

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Adresse email invalide');
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    await signIn(email, password);
    if (!error) router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Muslim Companion</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Se connecter</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/signup')}>
          <Text style={styles.link}>Pas encore de compte ? S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f4ff' },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#1a3a5c', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#7f8c8d', textAlign: 'center', marginBottom: 32 },
  input: {
    backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, borderWidth: 1, borderColor: '#dde3ed', marginBottom: 12, color: '#2c3e50',
  },
  error: { color: '#e74c3c', textAlign: 'center', marginBottom: 8 },
  btn: {
    backgroundColor: '#1a3a5c', borderRadius: 12, paddingVertical: 14,
    alignItems: 'center', marginTop: 8,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  link: { color: '#1a3a5c', textAlign: 'center', marginTop: 16, fontWeight: '600' },
});
