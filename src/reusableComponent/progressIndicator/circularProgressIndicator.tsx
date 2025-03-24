import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { theme } from '../../utils';

const CIRCLE_SIZE = theme.horizontalSpacing.space_230;

const CircularProgress = ({ percentage }) => {
  const imageSource = percentage === 100
    ? require('../../assets/images/resultpass.png')
    : require('../../assets/images/resultcross.png');

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width:theme.horizontalSpacing.space_374,
    // backgroundColor:'red'
    // marginTop:20
  },
  image: {
    width:theme.horizontalSpacing.space_374,
    height:theme.verticalSpacing.space_320,
   
    
  },
});

export default CircularProgress;
