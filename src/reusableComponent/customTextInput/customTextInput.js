import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../utils';
import * as Svg from '../../asstets/images/svg'; // Ensure these are valid SVG components or update the import path

const CustomTextInput = ({
  value,
  maxLength,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  style,
  inputStyle,
  leftIcon,
  onLeftIconPress,
  rightIcon,
  numberOfLines,
  ref,
  multiline = false,
  editable = true,
  onRightIconPress,
  textColor
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Left Icon */}
      {leftIcon && (
        <TouchableOpacity onPress={onLeftIconPress} style={styles.iconContainer}>
          {leftIcon}
        </TouchableOpacity>
      )}

      {/* Text Input */}
      <TextInput
      maxLength={maxLength}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        multiline={multiline}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry && isPasswordVisible} 
        style={[styles.input, inputStyle, { color: textColor }]}
        placeholderTextColor={'#BABABA'}
        ref={ref}
      />

      {/* Right Icon */}
      {secureTextEntry ? (
        // Show toggle for secureTextEntry
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          {isPasswordVisible ? (
             <Svg.CloseEye/>
          ) : (
            <Svg.EyeOpen /> 
          )}
        </TouchableOpacity>
      ) : (
        // Show rightIcon if provided
        rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
            {rightIcon}
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.lightColor.whiteColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.lightColor.borderColor,
    paddingHorizontal: theme.horizontalSpacing.space_12,
    height: theme.verticalSpacing.space_50,
    width:theme.horizontalSpacing.space_374
  },
  input: {
    flex: 1,
    fontSize: theme.fontSizes.size_16,
    color: theme.lightColor.lightGrayColor,
    
   
    // paddingHorizontal: theme.horizontalSpacing.space_8,
    
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTextInput;
