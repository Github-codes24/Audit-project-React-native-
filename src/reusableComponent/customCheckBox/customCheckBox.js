import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import * as Svg from '../../asstets/images/svg'
import { theme } from '../../utils';

const CustomCheckbox = ({ isChecked, onPress, text, link, linkText }) => {

  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
        onPress={onPress}
      >
       {isChecked && (
        
         <Svg.CheckBoxActive/>
        
        )}
      </TouchableOpacity>
      <Text style={styles.checkboxText}>
        {text}{' '}
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL('https://drive.google.com/file/d/1SM4uLLNnwWuO4GNiBWIjCN_p0JMB1DOa/view?usp=drive_link')}
        >
          {linkText}
         <Text style={{ color: 'black' }}>
    </Text>
        </Text>
      </Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    // padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 15,
    marginVertical:theme.verticalSpacing.space_10,
   
   
    
  },
  checkbox: {
    width:16,
    height: 16,
    borderWidth: 1,
    borderColor:theme.lightColor.blackColor,
    borderRadius:2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: 'white', // Your primary theme color
    borderColor: theme.lightColor.borderColor,
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  checkboxText: {
    fontSize:theme.fontSizes.size_16,
    color: theme.lightColor.blackColor,
    flexShrink: 1,
    fontWeight:'400',
    
  },
  linkText: {
    color:'gray', 
    borderBottomColor:'gray',
    textDecorationLine: 'underline',
  
  },
});

export default CustomCheckbox;
