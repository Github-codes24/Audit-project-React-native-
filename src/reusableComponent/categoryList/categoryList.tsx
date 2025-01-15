import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import CustomButton from '../button/button';
import * as Svg from '../../asstets/images/svg';
import { theme } from '../../utils';
import { useGetCompilanceQuestionsCategoryQuery } from '../../redux/apiSlice/complianceApiSlice';
import { useGetEligibilityCategoryQuery } from '../../redux/apiSlice/eligibilityApiSlice';
import Loader from '../loader/loader';

const CategorySelector = ({ 
  handleSelect, 
  onTakeTest,
  checkerType = 'compliance', // Determines the type of category to load
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch compliance categories if checkerType is 'compliance'
  const {
    data: complianceCategoryData,
    isLoading: isLoadingCompliance,
    isError: isErrorCompliance,
  } = useGetCompilanceQuestionsCategoryQuery({}, { skip: checkerType !== 'compliance' });


  console.log('complianceCategoryData',complianceCategoryData)
  // Fetch eligibility categories if checkerType is 'eligibility'
  const {
    data: eligibilityCategoryData,
    isLoading: isLoadingEligibility,
    isError: isErrorEligibility,
    error: errorEligibility
  } = useGetEligibilityCategoryQuery({},{skip: checkerType !== 'eligibility'});

  console.log('eligibilityCategoryData',eligibilityCategoryData,errorEligibility)

  // Determine the current category data based on checkerType
  const categoryData = checkerType === 'compliance' ? complianceCategoryData?.data : eligibilityCategoryData?.data;
  const isError = checkerType === 'compliance' ? isErrorCompliance : isErrorEligibility;

  // Handle category selection
  const handleCategorySelect = (selectedCategory:any) => {
    setSelectedCategoryId(selectedCategory?._id);
    handleSelect && handleSelect(selectedCategory); // Call the handleSelect callback if provided
  };

  // Loading state
  if (isLoadingCompliance||isErrorEligibility) {
    return (
      <Loader isLoading={isLoadingCompliance||isLoadingEligibility} />
    );
  }

  // Error state
  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load categories. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {checkerType === 'compliance' ? 'Sponsor License Compliance Checker' : 'Sponsor License Eligibility Checker'}
      </Text>
      
      <Text style={styles.subHeader}>Select Category</Text>

      {categoryData?.length > 0 ? (
        categoryData.map((category) => (
          <TouchableOpacity
            key={category?._id}
            style={styles.category}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
            <View
              style={[
                styles.circle,
                selectedCategoryId === category?._id && styles.selectedCircle,
              ]}
            >
              {selectedCategoryId === category?._id && <Svg.CheckIcon />}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No categories available</Text>
      )}
      
      <View style={{ marginTop: theme.verticalSpacing.space_100 }}>
        <CustomButton
          title="Take test"
          onPress={onTakeTest} 
          disabled={!selectedCategoryId} // Disable button if no category is selected
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#F2F3F5',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: theme.fontSizes.size_16,
    marginTop: theme.verticalSpacing.space_50,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.3,
  },
  categoryText: {
    fontSize: theme.fontSizes.size_16,
    color: theme.lightColor.blackColor,
    fontWeight: '500',
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
  errorText: {
    fontSize: theme.fontSizes.size_14,
    color: 'red',
    textAlign: 'center',
  },
});

export default CategorySelector;
