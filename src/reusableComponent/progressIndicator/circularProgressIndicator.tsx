import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { theme } from '../../utils';

const CircularProgress = ({ percentage }) => {
  const radius = 100; 
  const strokeWidth = 15; 
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  // Determine the color based on the percentage
  const progressColor = percentage > 99 ? '#4CAF50' : '#D32F2F'; 

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
      {percentage &&  <Text style={styles.percentageText}>{percentage}%</Text>}
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:40,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
  },
  percentageContainer: {
    height:160,
    width:160,
    backgroundColor:'#F8F6FD',
    elevation:5,
    borderRadius:80,
    position: 'absolute',
    // top: '42%',
    // left: '38%',
    justifyContent: 'center',
    alignItems: 'center',
     shadowColor: '#000', 
  shadowOffset: { width: 0, height: 2 }, 
  shadowOpacity: 0.2, 
  shadowRadius: 4, 
  },
  percentageText: {
    fontSize:theme.fontSizes.size_40,
    fontWeight: '700',
    color: theme.lightColor.brownColor,
  },
});

export default CircularProgress;
