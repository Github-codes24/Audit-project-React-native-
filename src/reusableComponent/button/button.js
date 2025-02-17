import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../utils';

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor:theme.lightColor.brownColor, 
    borderRadius:theme.horizontalSpacing.space_10, 
    alignItems: 'center',
    justifyContent: 'center',
    width:theme.horizontalSpacing.space_374,
   height:theme.verticalSpacing.space_50,
    alignSelf:'center',
    
    // marginHorizontal:theme.horizontalSpacing.space_20
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize:theme.fontSizes.size_16,
    fontWeight: '500',
  },
});

export default CustomButton;
