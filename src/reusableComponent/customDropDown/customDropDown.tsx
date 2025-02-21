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
    <View style={[styles.rightIconContainer, { width: rightIconContainerWidth }]}>
      <View style={styles.iconWrapper}>
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
          style={styles.dropdown}
          containerStyle={styles.dropdownContainerStyle}
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
          flatListProps={{
            ItemSeparatorComponent: () => <View style={{ height: 0 }} />, // No extra gap
            contentContainerStyle: { paddingVertical: 0, marginVertical: 0 },
          }}
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
  dropdown: {
    width: '100%',
    height: theme.verticalSpacing.space_50,
    borderRadius: 10,
    paddingVertical: 0, // No extra padding
    marginVertical: 0,  // No extra margin
  },
  dropdownContainerStyle: {
    borderRadius: 10,
    paddingVertical: 0, 
    marginVertical: 0,
     
  },
  placeholderStyle: {
    fontSize: theme.fontSizes.size_16,
    marginLeft: 10,
    color: 'gray',
    paddingHorizontal: theme.horizontalSpacing.space_8,
  },
  selectedTextStyle: {
    fontSize: theme.fontSizes.size_16,
    color: theme.lightColor.blackColor,
    fontFamily: theme.fontFamily.notoSans.regular_400,
    paddingHorizontal: theme.horizontalSpacing.space_8,
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: theme.horizontalSpacing.space_10,
    justifyContent: 'center',
    paddingRight: theme.horizontalSpacing.space_10,
  },
  itemTextStyle: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: '400',
    color: theme.lightColor.blackColor,
    paddingVertical:0, // Reduce item spacing
    marginVertical: 0,  // Ensure no extra margin
    
  },
  labelContainer: {
    position: 'absolute',
    left: theme.horizontalSpacing.space_8,
    backgroundColor: theme.lightColor.whiteColor,
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: theme.fontSizes.size_12,
    color: theme.lightColor.grayColor,
  },
});
