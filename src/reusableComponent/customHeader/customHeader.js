import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Replace with a different library if not using Expo
import { theme } from '../../utils';

const CustomHeader = ({
  title,
  subtitle,
  onBackPress,
  leftIcon,
  titleColor = '#1F2937',
  leftIconColor = theme.lightColor.backButtonColor, // Default color for the left icon button
}) => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={''} /> */}
      <View
        style={{
          paddingHorizontal: 10,
          height: theme.verticalSpacing.space_60,
          width: theme.horizontalSpacing.space_70,
          top: 20,
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: leftIcon ? leftIconColor : 'transparent' }]}
          onPress={onBackPress}
        >
          {leftIcon}
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  //  backgroundColor:'red',
    height: theme.verticalSpacing.space_156,
  },
  backButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 50,
    width: theme.horizontalSpacing.space_32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
    // height: theme.verticalSpacing.space_60,
    paddingHorizontal:theme.horizontalSpacing.space_20
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor:"red"
  },
  title: {
    fontSize: theme.fontSizes.size_30,
    fontWeight: 'bold',
    color:theme.lightColor.blackColor,
    marginTop:theme.verticalSpacing.space_40
  },
  subtitle: {
    fontSize: 14,
    color: 'red',
    marginTop: 4,
  },
});

export default CustomHeader;
