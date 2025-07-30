import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import { theme } from '../../utils';
import { ThemeContext } from '@react-navigation/native';

const CircularProgress = ({ percentage = 0 }) => {
  const clampedValue = Math.max(0, Math.min(100, percentage));

  const getLabels = () => {
    const defaultLabels = [
      { 
        name: '',
        labelColor: '#ff2900',
        activeBarColor: '#ff2900',
      },
      {
        name: '',
        labelColor: '#ff6f00',
        activeBarColor: '#ff6f00',
      },
      {
        name: '',
        labelColor: '#f4ab44',
        activeBarColor: '#f4ab44',
      },
      {
        name: '',
        labelColor: '#c5f200',
        activeBarColor: '#c5f200',
      },
      {
        name: '',
        labelColor: '#00ff6b', 
        activeBarColor: '#00ff6b',
      },
    ];

    if (clampedValue === 100) {
      defaultLabels[4] = {
        name: '',
        labelColor: '#00ff6b',
        activeBarColor: '#00ff6b',
      };
    }

    return defaultLabels;
  };

  return (
    <View style={styles.container}>
      <RNSpeedometer
        value={clampedValue}
        size={theme.horizontalSpacing.space_374}
        minValue={0}
        maxValue={100}
        numberOfLevels={5}
        labels={getLabels()}
        labelStyle={{ opacity: 0 }}
        valueTextStyle={{ opacity: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: theme.horizontalSpacing.space_327,
    height: theme.horizontalSpacing.space_222,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:theme.verticalSpacing.space_40,
  },
});

export default CircularProgress;
