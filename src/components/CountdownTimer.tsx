import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { formatCountdown } from '../utils/formatting';

interface CountdownTimerProps {
  targetTimestamp: number;
  onExpire?: () => void;
  style?: object;
}

export function CountdownTimer({ targetTimestamp, onExpire, style }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(targetTimestamp - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetTimestamp - Date.now();
      if (diff <= 0) {
        setRemaining(0);
        clearInterval(interval);
        onExpire?.();
      } else {
        setRemaining(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp, onExpire]);

  return (
    <Text style={[styles.text, style]}>
      {formatCountdown(remaining)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a3a5c',
    letterSpacing: 2,
  },
});
