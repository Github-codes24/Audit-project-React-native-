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
          onPress={() => Linking.openURL(link)}
        >
          {linkText}
        </Text>
      </Text>
    </View>
  );
};

const TermsScreen = () => {
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const [isTermsChecked, setTermsChecked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Privacy Policy Checkbox */}
      <CustomCheckbox
        isChecked={isPrivacyChecked}
        onPress={() => setPrivacyChecked(!isPrivacyChecked)}
        text="I have read and understood the"
        link="https://example.com/privacy-policy"
        linkText="Privacy Policy"
      />

      {/* Terms and Conditions Checkbox */}
      <CustomCheckbox
        isChecked={isTermsChecked}
        onPress={() => setTermsChecked(!isTermsChecked)}
        text="I agree to the"
        link="https://example.com/terms-and-conditions"
        linkText="Terms and Conditions"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 15,
    margin:theme.verticalSpacing.space_10,
    
  },
  checkbox: {
    width:16,
    height: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
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
    color: '#333',
    flexShrink: 1,
  },
  linkText: {
    color: theme.lightColor.borderColor, 
    textDecorationLine: 'underline',
  },
});

export default CustomCheckbox;
