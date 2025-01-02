import React from 'react';
import { StyleSheet, ImageBackground, View, StatusBar } from 'react-native';

const BackgroundLayout = ({ children }) => {
  return (
   
      <View style={styles.overlay}>
         <StatusBar backgroundColor={'#F2F3F5'}/>
        {children}
      </View>
      
  
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor:'#F2F3F5'
  },
  overlay: {
    flex: 1,
    // Optional: Add a translucent overlay
  },
});

export default BackgroundLayout;
