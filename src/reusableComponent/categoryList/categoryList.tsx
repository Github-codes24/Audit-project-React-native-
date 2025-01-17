import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);

  // Fetch compliance categories if checkerType is 'compliance'
  const {
    data: complianceCategoryData,
    isLoading: isLoadingCompliance,
    isError: isErrorCompliance,
    refetch: refetchCompliance
  } = useGetCompilanceQuestionsCategoryQuery({}, { skip: checkerType !== 'compliance' });

  // Fetch eligibility categories if checkerType is 'eligibility'
  const {
    data: eligibilityCategoryData,
    isLoading: isLoadingEligibility,
    isError: isErrorEligibility,
    refetch: refetchEligibility
  } = useGetEligibilityCategoryQuery({}, { skip: checkerType !== 'eligibility' });

  // Determine the current category data based on checkerType
  const categoryData = checkerType === 'compliance' ? complianceCategoryData?.data : eligibilityCategoryData?.data;
  const isError = checkerType === 'compliance' ? isErrorCompliance : isErrorEligibility;
  const isLoading = checkerType === 'compliance' ? isLoadingCompliance : isLoadingEligibility;
  const refetchData = checkerType === 'compliance' ? refetchCompliance : refetchEligibility;

  // Handle category selection
  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategoryId(selectedCategory?._id);
    handleSelect && handleSelect(selectedCategory); // Call the handleSelect callback if provided
  };

  // Refresh function for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refetchData(); // Trigger the appropriate refetch function
    setRefreshing(false);
  };

  // Loading state
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  // Error state
  if (isError) {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.errorText}>Failed to load categories. Please try again later.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#F2F3F5',
    flexGrow: 1, 
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
    marginBottom: 10,
  },
});

export default CategorySelector;
