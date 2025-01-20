import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as Svg from '../../asstets/images/svg';
import { theme } from '../../utils';

// Theme for colors and spacing


// Dropdown component
const CustomDropDown = ({
  data,
  placeholder = 'Select an option',
  value,
  onSelect,
  containerWidth = '100%',
  containerStyle,
  maxHeight = theme.verticalSpacing.space_100 * 2,
  listItemTextStyle,
  rightIconContainerWidth = theme.horizontalSpacing.space_10,
  isShowLabel = true,
  dropdownIconColor,
  selectedTextStyle,
  placeholderTextStyle,
  labelField = 'label',
  valueField = 'value',
  search = false,
  searchPlaceholder = 'Search',
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderRightIcon = () => (
    <View
      style={[
        styles.rightIconContainer,
        { width: rightIconContainerWidth },
      ]}
    >
      <View style={{backgroundColor:'red',margin}}>
      <Svg.DropDownIcon color={dropdownIconColor || theme.lightColor.blackColor} />
   </View>
    </View>

  );

  return (
    <TouchableOpacity onPress={() => setIsFocus(true)}>
      <View style={styles.container}>
        {value && isShowLabel && (
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{placeholder}</Text>
          </View>
        )}

        <Dropdown
          style={[
            styles.dropdown,
            {
              width: containerWidth,
              height:theme.verticalSpacing.space_50,
            },
            containerStyle,
          ]}
          placeholderStyle={[styles.placeholderStyle, placeholderTextStyle]}
          selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
          data={data}
          showsVerticalScrollIndicator={false}
          maxHeight={maxHeight}
          labelField={labelField}
          valueField={valueField}
          placeholder={value ? '' : placeholder}
          value={value}
          search={search}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            onSelect && onSelect(item[valueField]);
            setIsFocus(false);
          }}
          renderRightIcon={renderRightIcon}
          itemTextStyle={[styles.itemTextStyle, listItemTextStyle]}
          searchPlaceholder={searchPlaceholder}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomDropDown;

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    height: theme.verticalSpacing.space_50,
     width:374,
     borderRadius:10
  },
  dropdown: {
    borderBottomWidth: 1,
    borderBottomColor: theme.lightColor.grayColor,
  },
  placeholderStyle: {
    fontSize: theme.fontSizes.size_14,
    fontFamily: theme.fontFamily.notoSans.regular_400,
    color: theme.lightColor.grayColor,
    paddingHorizontal: theme.horizontalSpacing.space_8,
  },
  selectedTextStyle: {
    fontSize: theme.fontSizes.size_14,
    color: theme.lightColor.blackColor,
    fontFamily: theme.fontFamily.notoSans.regular_400,
    paddingHorizontal: theme.horizontalSpacing.space_8,
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextStyle: {
    fontFamily: theme.fontFamily.notoSans.regular_400,
    color: theme.lightColor.blackColor,
    fontSize: theme.fontSizes.size_14,
  },
  labelContainer: {
    justifyContent: 'center',
    backgroundColor: theme.lightColor.whiteColor,
  },
  labelText: {
    fontSize: theme.fontSizes.size_12,
    fontFamily: theme.fontFamily.notoSans.regular_400,
    color: theme.lightColor.grayColor,
    position: 'absolute',
    top: -theme.horizontalSpacing.space_6,
    left: theme.horizontalSpacing.space_8,
  },
});
