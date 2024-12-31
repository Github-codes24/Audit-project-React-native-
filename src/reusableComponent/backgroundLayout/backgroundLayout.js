import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';

const BackgroundLayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../asstets/images/backgroundImage.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    // Optional: Add a translucent overlay
  },
});

export default BackgroundLayout;
