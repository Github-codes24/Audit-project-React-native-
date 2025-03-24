import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import CustomButton from '../button/button';
import * as Svg from '../../assets/images/svg';
import { theme } from '../../utils';
import { useGetCompilanceQuestionsCategoryQuery } from '../../redux/apiSlice/complianceApiSlice';
import { useGetEligibilityCategoryQuery } from '../../redux/apiSlice/eligibilityApiSlice';
import Loader from '../loader/loader';

const CategorySelector = ({ handleSelect, onTakeTest, checkerType = 'compliance' }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch categories based on checkerType
  const {
    data: complianceCategoryData,
    isLoading: isLoadingCompliance,
    isError: isErrorCompliance,
    refetch: refetchCompliance
  } = useGetCompilanceQuestionsCategoryQuery({}, { skip: checkerType !== 'compliance' });

  const {
    data: eligibilityCategoryData,
    isLoading: isLoadingEligibility,
    isError: isErrorEligibility,
    refetch: refetchEligibility
  } = useGetEligibilityCategoryQuery({}, { skip: checkerType !== 'eligibility' });

  const categoryData = checkerType === 'compliance' ? complianceCategoryData?.data : eligibilityCategoryData?.data;
  const isLoading = checkerType === 'compliance' ? isLoadingCompliance : isLoadingEligibility;
  const isError = checkerType === 'compliance' ? isErrorCompliance : isErrorEligibility;
  const refetchData = checkerType === 'compliance' ? refetchCompliance : refetchEligibility;

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategoryId(selectedCategory?._id);
    handleSelect && handleSelect(selectedCategory);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchData();
    setRefreshing(false);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

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
        {checkerType === 'compliance' ? 'Check Your Sponsor License Compliance Score' : 'Check Your Eligibility For Sponsor License'}
      </Text>

      <Text style={styles.subHeader}>Select your business category</Text>

      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={styles.categoriesContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
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
        </ScrollView>
      </View>

      {/* Fixed Bottom Button */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Continue" onPress={onTakeTest} disabled={!selectedCategoryId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex:1,

    paddingHorizontal: 19,
    // backgroundColor: 'red',
  },
  header: {
    fontSize: theme.fontSizes.size_20,
    fontWeight: '700',
    marginBottom: 10,
    marginTop:theme.verticalSpacing.space_20,
  },
  subHeader: {
    fontSize: theme.fontSizes.size_20,
    marginTop: theme.verticalSpacing.space_100,
    fontWeight: '600',
  },
  scrollContainer: {
    height:"100%", 
    marginBottom: 80, 
    // backgroundColor:"red"

  },
  categoriesContainer: {
    paddingBottom:theme.verticalSpacing.space_80,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.verticalSpacing.space_58,
    paddingHorizontal: 10,
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
  buttonContainer: {
    position: 'absolute',
    bottom:theme.verticalSpacing.space_100,
    left: 0,
    right: 0,
    paddingHorizontal: 19,
    backgroundColor: '#F2F3F5',
    paddingVertical: 10,
    height:theme.verticalSpacing.space_50,
    alignItems:"center",
    justifyContent:"center"
  },
});

export default CategorySelector;
