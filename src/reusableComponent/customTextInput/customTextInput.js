import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../utils';
import Svg, { Path } from 'react-native-svg'; // Importing Svg and Path for the eye icon

const CustomTextInput = ({
  value,
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
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      {leftIcon && (
        <TouchableOpacity onPress={onLeftIconPress} style={styles.iconContainer}>
          {leftIcon}
        </TouchableOpacity>
      )}

      <TextInput
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        multiline={multiline}
        keyboardType={keyboardType}
        secureTextEntry={isPasswordVisible} // Conditionally show/hide password
        style={[styles.input, inputStyle]}
        placeholderTextColor={'#BABABA'}
        ref={ref}
      />

      {rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        // If no rightIcon is passed, use the toggle button for password visibility
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          {/* <Svg width={24} height={24} viewBox="0 0 24 24" fill="none"> */}
            {/* Eye icon for visibility */}
            {/* {isPasswordVisible ? (
              <Path
                d="M12 4C8.13 4 5 6.83 5 10C5 11.6 5.62 13.16 6.8 14.34C8.06 15.56 9.64 16.17 11.29 16.55C12.94 16.93 14.66 16.97 16.28 16.65C17.9 16.33 19.24 15.72 20.04 14.7L19.15 13.79C18.42 14.42 17.31 14.67 16.35 14.35C15.4 14.02 14.8 13.06 14.5 12.13C14.19 11.19 14.13 10.1 14.42 9.19C14.72 8.28 15.27 7.66 16.01 7.32C16.75 6.99 17.65 7.07 18.35 7.46C19.05 7.85 19.55 8.56 19.74 9.38C19.93 10.2 19.73 11.07 19.23 11.6C18.74 12.14 17.89 12.37 17.14 12.15C16.4 11.92 15.87 11.24 15.62 10.47C15.37 9.71 15.41 8.91 15.7 8.17L16.7 6.17C17.7 4.17 15.92 2 12 2C8.08 2 5.69 3.82 4.92 6.42L5.88 7.59C6.7 5.75 9.17 4 12 4Z"
                fill="black"
              />
            ) : (
              <Path
                d="M12 4C8.13 4 5 6.83 5 10C5 11.6 5.62 13.16 6.8 14.34C8.06 15.56 9.64 16.17 11.29 16.55C12.94 16.93 14.66 16.97 16.28 16.65C17.9 16.33 19.24 15.72 20.04 14.7L19.15 13.79C18.42 14.42 17.31 14.67 16.35 14.35C15.4 14.02 14.8 13.06 14.5 12.13C14.19 11.19 14.13 10.1 14.42 9.19C14.72 8.28 15.27 7.66 16.01 7.32C16.75 6.99 17.65 7.07 18.35 7.46C19.05 7.85 19.55 8.56 19.74 9.38C19.93 10.2 19.73 11.07 19.23 11.6C18.74 12.14 17.89 12.37 17.14 12.15C16.4 11.92 15.87 11.24 15.62 10.47C15.37 9.71 15.41 8.91 15.7 8.17L16.7 6.17C17.7 4.17 15.92 2 12 2C8.08 2 5.69 3.82 4.92 6.42L5.88 7.59C6.7 5.75 9.17 4 12 4Z"
                fill="gray"
              />
            )}
          </Svg> */}
        </TouchableOpacity>
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
    borderColor: theme.lightColor.grayColor,
    paddingHorizontal: theme.horizontalSpacing.space_12,
    height: theme.verticalSpacing.space_50,
    borderColor:theme.lightColor.borderColor
  },
  input: {
    flex: 1,
    fontSize: theme.fontSizes.size_14,
    color: theme.lightColor.lightGrayColor,
    paddingHorizontal: theme.horizontalSpacing.space_8,
  },
  iconContainer: {
   marginTop:5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: theme.horizontalSpacing.space_8,
  },
});

export default CustomTextInput;
