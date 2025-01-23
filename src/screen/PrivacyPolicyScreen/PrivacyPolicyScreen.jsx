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
  import { useGetPrivacyPolicyQuery } from '../../redux/apiSlice/profileApiSlice';
  const PrivacyPolicyScreen = ({navigation}) => {


    const {
      data: privacyPolicyData,
      error: privacyPolicyError,
      isLoading: privacyPolicyIsLoading

    }= useGetPrivacyPolicyQuery({})

   

    return (
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* Header */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Svg.ArrowBack />
        </TouchableOpacity>
  
        <Text style={styles.HeadText}>{privacyPolicyData?.data?.title}</Text>
        <ScrollView>
          <Text style={styles.privactpolicyText}>
            {privacyPolicyData?.data?.sections}
          </Text>
        </ScrollView>
      </View>
      </SafeAreaView>
    );
  };
  
  export default PrivacyPolicyScreen;
  
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
      marginTop: theme.verticalSpacing.space_50,
      marginBottom: theme.verticalSpacing.space_20,
    },
    privactpolicyText: {
      fontSize: theme.fontSizes.size_16,
      fontWeight: '400',
    },
  });
  