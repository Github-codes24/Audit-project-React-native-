import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import * as Svg from '../../asstets/images/svg';
import {theme} from '../../utils';
import { useGetProfileTermAndConditionApiQuery } from '../../redux/apiSlice/profileApiSlice';
const TermsAndConditionScreen = ({navigation}) => {

  const {
    data: profileTermAndConditionData,
    error: profileTermAndConditionError,  
    isLoading: profileTermAndConditionIsLoading
    
  }= useGetProfileTermAndConditionApiQuery({})
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Svg.ArrowBack />
      </TouchableOpacity>

      <Text style={styles.HeadText}>{profileTermAndConditionData?.data?.title}</Text>
      <ScrollView>
        <Text style={styles.termsAndConditionText}>
         {
          profileTermAndConditionData?.data?.sections
         }
        </Text>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default TermsAndConditionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 18,
  },
  HeadText: {
    fontSize: theme.fontSizes.size_30,
    fontWeight: '600',
    marginTop: theme.verticalSpacing.space_80,
    marginBottom: theme.verticalSpacing.space_20,
  },
  termsAndConditionText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: '400',
  },
});
