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
    paddingVertical:theme.verticalSpacing.space_12,
    paddingHorizontal: 20,
    borderRadius:theme.horizontalSpacing.space_10, 
    alignItems: 'center',
    justifyContent: 'center',
    width:theme.horizontalSpacing.space_358,
    height:theme.verticalSpacing.space_40,
    alignSelf:'center',
    
    // marginHorizontal:theme.horizontalSpacing.space_20
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize:theme.fontSizes.size_14,
    fontWeight: '500',
  },
});

export default CustomButton;
