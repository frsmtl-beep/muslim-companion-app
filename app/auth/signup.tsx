import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { isValidEmail, isValidPassword } from '../../src/utils/validation';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signUp, loading, error } = useAuth();

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Adresse email invalide');
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    await signUp(email, password, fullName);
    if (!error) {
      Alert.alert('Succès', 'Compte créé ! Vérifiez votre email.', [
        { text: 'OK', onPress: () => router.replace('/auth/login') },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>Muslim Companion</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom complet (optionnel)"
          value={fullName}
          onChangeText={setFullName}
        />
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
          placeholder="Mot de passe (min. 8 caractères)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.btn} onPress={handleSignup} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>S'inscrire</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
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
