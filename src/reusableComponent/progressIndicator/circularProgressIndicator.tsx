import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const CircularProgress = ({ percentage }) => {
  const radius = 100; // Radius of the circle
  const strokeWidth = 15; // Thickness of the progress bar
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  // Determine the color based on the percentage
  const progressColor = percentage > 70 ? '#4CAF50' : '#D32F2F'; // Green if >70, Red otherwise

  return (
    <View style={styles.container}>
      <Svg width="250" height="250" viewBox="0 0 250 250">
        <G rotation="-90" origin="125, 125">
          {/* Background Circle */}
          <Circle
            cx="125"
            cy="125"
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx="125"
            cy="125"
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
      {/* Percentage Text */}
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
  },
  percentageContainer: {
    position: 'absolute',
    top: '42%',
    left: '42%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
});

export default CircularProgress;
