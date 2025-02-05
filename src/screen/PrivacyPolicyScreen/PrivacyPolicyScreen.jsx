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
import { theme } from '../../utils';
import { useGetPrivacyPolicyQuery } from '../../redux/apiSlice/profileApiSlice';
import Loader from '../../reusableComponent/loader/loader';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const PrivacyPolicyScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  const {
    data: privacyPolicyData,
    isLoading: privacyPolicyIsLoading
  } = useGetPrivacyPolicyQuery({});

  const content = privacyPolicyData?.data?.sections || '';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Loader isLoading={privacyPolicyIsLoading} />

        {/* Header */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Svg.ArrowBack />
        </TouchableOpacity>

        <Text style={styles.HeadText}>{privacyPolicyData?.data?.title}</Text>
        
        <ScrollView>
          {/<[a-z][\s\S]*>/i.test(content) ? (
            <RenderHtml contentWidth={width} source={{ html: content }} />
          ) : (
            <Text style={styles.privacyPolicyText}>{content}</Text>
          )}
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
  HeadText: {
    fontSize: theme.fontSizes.size_30,
    fontWeight: '600',
    marginTop: theme.horizontalSpacing.space_100,
    marginBottom: theme.verticalSpacing.space_20,
  },
  privacyPolicyText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: '400',
  },
});
