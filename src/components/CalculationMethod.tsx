import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CALCULATION_METHODS } from '../constants/prayers';
import { CalculationMethodId } from '../types/prayer';

interface CalculationMethodProps {
  selected: CalculationMethodId;
  onChange: (id: CalculationMethodId) => void;
}

export function CalculationMethodSelector({ selected, onChange }: CalculationMethodProps) {
  return (
    <FlatList
      data={CALCULATION_METHODS}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isSelected = item.id === selected;
        return (
          <TouchableOpacity
            style={[styles.item, isSelected && styles.selectedItem]}
            onPress={() => onChange(item.id as CalculationMethodId)}
          >
            <View>
              <Text style={[styles.name, isSelected && styles.selectedText]}>{item.name}</Text>
              <Text style={styles.region}>{item.region}</Text>
            </View>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  selectedItem: {
    backgroundColor: '#e8f0fb',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
    flexShrink: 1,
    maxWidth: 280,
  },
  selectedText: {
    color: '#1a3a5c',
    fontWeight: '700',
  },
  region: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f4ff',
    marginHorizontal: 16,
  },
});
