import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import * as Svg from '../../assets/images/svg';
import { theme } from '../../utils';

const CustomCheckbox = ({ isChecked, onPress, text, link, linkText, linkText2, link2,showAndText = false  }) => {
  return (
    <View style={styles.checkboxContainer}>
      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
        onPress={onPress}
      >
        {isChecked && <Svg.CheckBoxActive />}
      </TouchableOpacity>

      {/* Text with links in the same line */}
     <Text style={styles.checkboxText}>
        {text}{' '}
        <Text 
          style={styles.linkText} 
          onPress={() => Linking.openURL(link)}
        >
          {linkText}
        </Text>
        {showAndText && linkText2 && link2 && (
          <>
            {' '}and{' '}
            <Text 
              style={styles.linkText} 
              onPress={() => Linking.openURL(link2)}
            >
              {linkText2}
            </Text>
          </>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align checkbox at the top, not center
    marginVertical: theme.verticalSpacing.space_10,
  },
  checkbox: {
    width: theme.horizontalSpacing.space_16,
    height: theme.verticalSpacing.space_16,
    borderWidth: 1,
    borderColor: theme.lightColor.blackColor,
    borderRadius: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:2
  },
  checkedCheckbox: {
    backgroundColor: 'white',
    borderColor: theme.lightColor.borderColor,
  },
  checkboxText: {
    fontSize: theme.fontSizes.size_16,
    color: theme.lightColor.blackColor,
    flexShrink: 1,
    fontWeight: '400',
  },
  linkText: {
    color: 'gray',
    textDecorationLine: 'underline',
  },
});

export default CustomCheckbox;
