import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '../button/button';
import * as Svg from '../../asstets/images/svg'
import { theme } from '../../utils';

const CategorySelector = ({ 
  categoryList, 
  handleSelect, 
  onTakeTest 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sponsor License Compliance Checker</Text>
      
      <Text style={styles.subHeader}>Select Category</Text>

      {categoryList.length > 0 ? (
        categoryList.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.category}
            onPress={() => handleSelect(category.id)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
            <View
              style={[
                styles.circle,
                category.isSelected && styles.selectedCircle,
              ]}
            >
              {category.isSelected && <Svg.CheckIcon />}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No categories available</Text>
      )}
      
      <View style={{ marginTop: theme.verticalSpacing.space_100 }}>
        <CustomButton
          title={'Take test'}
          onPress={onTakeTest} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    paddingHorizontal: 15,
    backgroundColor:'#F2F3F5'
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize:theme.fontSizes.size_16,
    marginTop:theme.verticalSpacing.space_50
    // marginBottom: 10,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius:10,
    borderWidth:.3
    
  },
  categoryText: {
    fontSize:theme.fontSizes.size_16,
    color:theme.lightColor.blackColor,
    fontWeight:'500'
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
});

export default CategorySelector;
