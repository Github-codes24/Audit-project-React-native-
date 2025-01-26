import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as Svg from '../../asstets/images/svg';
import { theme } from '../../utils';

const CustomDropDown = ({
  data,
  placeholder = 'Select',
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
      <View
        style={{
          marginRight: theme.horizontalSpacing.space_10,
          justifyContent: 'center',
          paddingRight: theme.horizontalSpacing.space_10,
        }}
      >
        <Svg.DropDownIcon color={dropdownIconColor || theme.lightColor.blackColor} />
      </View>
    </View>
  );

  return (
    <TouchableOpacity onPress={() => setIsFocus(true)}>
      <View style={[styles.container, containerStyle]}>
        {isFocus && !value && isShowLabel && (
          <View style={styles.labelContainer}>
            {/* <Text style={styles.labelText}>{placeholder}</Text> */}
          </View>
        )}

        <Dropdown
          style={[
            styles.dropdown,
            {
              width: containerWidth,
              height: theme.verticalSpacing.space_50,
            },
          ]}
          placeholderStyle={[styles.placeholderStyle, placeholderTextStyle]}
          selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
          data={data}
          showsVerticalScrollIndicator={false}
          maxHeight={maxHeight}
          labelField={labelField}
          valueField={valueField}
          placeholder={!value ? placeholder : ''}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: theme.verticalSpacing.space_50,
    width: theme.horizontalSpacing.space_374,
    borderRadius: 10,
    borderColor: '#ccc',
    marginTop: 5,
  },
  dropdown: {},
  placeholderStyle: {
    fontSize: theme.fontSizes.size_14,
    marginLeft: 10,
    color: 'gray',
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
    fontWeight: '400',
    color: theme.lightColor.blackColor,
    fontSize: theme.fontSizes.size_14,
  },
  labelContainer: {
    position: 'absolute',
    top: -theme.horizontalSpacing.space_8,
    left: theme.horizontalSpacing.space_8,
    backgroundColor: theme.lightColor.whiteColor,
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: theme.fontSizes.size_12,
    color: theme.lightColor.grayColor,
  },
});
