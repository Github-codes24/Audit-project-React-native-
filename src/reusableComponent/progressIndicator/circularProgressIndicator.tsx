import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { Shadow } from 'react-native-shadow-2';
import { theme } from '../../utils';

const CIRCLE_SIZE = theme.horizontalSpacing.space_230; 
const INNER_SIZE = theme.horizontalSpacing.space_156;  
const RADIUS = (CIRCLE_SIZE / 2) - 15; 
const STROKE_WIDTH = 15;

const CircularProgress = ({ percentage }) => {
  const circumference = 2 * Math.PI * RADIUS;
  const progress = (percentage / 100) * circumference;

  // Progress color logic
  const progressColor = percentage > 99 ? '#4CAF50' : '#D32F2F';

  return (
    <View style={styles.container}>
      {/* Circular Progress View */}
      <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}>
        <G rotation="-90" origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}>
          {/* Background Circle */}
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="#E0E0E0"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke={progressColor}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>

      {/* Centered Percentage View */}
      <View style={styles.centeredContent}>
        <Shadow distance={8}>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
        </Shadow>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  centeredContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: INNER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F6FD',
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  percentageText: {
    fontSize:theme.fontSizes.size_40,
    fontWeight: '700',
    color: theme.lightColor.brownColor,
  },
});

export default CircularProgress;
