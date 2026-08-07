import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { degreesToCompassPoint } from '../utils/formatting';

interface QiblaCompassProps {
  qiblaDirection: number;
  compassHeading?: number; // from device magnetometer
}

const SIZE = 260;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 20;

export function QiblaCompass({ qiblaDirection, compassHeading = 0 }: QiblaCompassProps) {
  // Rotate so that the needle points to Qibla relative to North
  const needleAngle = qiblaDirection - compassHeading;
  const needleRad = ((needleAngle - 90) * Math.PI) / 180;
  const needleX = CENTER + RADIUS * 0.7 * Math.cos(needleRad);
  const needleY = CENTER + RADIUS * 0.7 * Math.sin(needleRad);

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        {/* Outer circle */}
        <Circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="#1a3a5c" strokeWidth={3} fill="#f0f4ff" />
        {/* Cardinal points */}
        {['N', 'E', 'S', 'O'].map((dir, i) => {
          const angle = ((i * 90 - 90) * Math.PI) / 180;
          const tx = CENTER + (RADIUS - 14) * Math.cos(angle);
          const ty = CENTER + (RADIUS - 14) * Math.sin(angle) + 5;
          return (
            <SvgText key={dir} x={tx} y={ty} textAnchor="middle" fill="#1a3a5c" fontSize={14} fontWeight="700">
              {dir}
            </SvgText>
          );
        })}
        {/* Qibla needle */}
        <Line
          x1={CENTER}
          y1={CENTER}
          x2={needleX}
          y2={needleY}
          stroke="#4caf50"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* Center dot */}
        <Circle cx={CENTER} cy={CENTER} r={6} fill="#1a3a5c" />
      </Svg>
      <Text style={styles.degree}>{Math.round(qiblaDirection)}° {degreesToCompassPoint(qiblaDirection)}</Text>
      <Text style={styles.label}>Direction de la Qibla</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  degree: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a3a5c',
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 2,
  },
});
