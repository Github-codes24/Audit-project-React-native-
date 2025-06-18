import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {theme, useCustomStyles} from '../../utils';
import { Text } from 'react-native-svg';
const SplashScreen = () => {
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/naralogo.png')} style={styles.backgroundImage} />
    </View>
  );
};

const styles =
  StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
      justifyContent: 'center',
      alignItems: 'center',
    
    },
    backgroundImage: {
     width:280,
     height:200
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      position: 'absolute',
    },
  });

export default SplashScreen;
