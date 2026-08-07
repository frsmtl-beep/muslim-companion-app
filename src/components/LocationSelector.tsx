import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CITIES, City } from '../constants/cities';
import { LocationInfo } from '../types';

interface LocationSelectorProps {
  onSelect: (location: LocationInfo) => void;
  onClose?: () => void;
}

export function LocationSelector({ onSelect, onClose }: LocationSelectorProps) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? CITIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.country.toLowerCase().includes(query.toLowerCase()),
      )
    : CITIES.slice(0, 20);

  const handleSelect = (city: City) => {
    onSelect({
      coordinates: { latitude: city.latitude, longitude: city.longitude },
      city: city.name,
      country: city.country,
      timezone: city.timezone,
      source: 'manual',
    });
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher une ville..."
        value={query}
        onChangeText={setQuery}
        autoFocus
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => `${item.name}-${item.countryCode}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
            <Text style={styles.cityName}>{item.name}</Text>
            <Text style={styles.countryName}>{item.country}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#dde3ed',
    borderRadius: 10,
    fontSize: 15,
    color: '#2c3e50',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cityName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  countryName: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f4ff',
    marginHorizontal: 16,
  },
});
