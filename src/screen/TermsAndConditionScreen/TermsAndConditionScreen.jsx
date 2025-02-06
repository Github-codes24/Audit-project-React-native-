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
import { useGetProfileTermAndConditionApiQuery } from '../../redux/apiSlice/profileApiSlice';
import Loader from '../../reusableComponent/loader/loader';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const TermsAndConditionScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  const {
    data: profileTermAndConditionData,
    isLoading: profileTermAndConditionIsLoading,
  } = useGetProfileTermAndConditionApiQuery({});

  const content = profileTermAndConditionData?.data?.sections || '';

  return (
    <SafeAreaView style={{ flex: 1,marginBottom:theme.verticalSpacing.space_100 }}>
      <View style={styles.container}>
        <Loader isLoading={profileTermAndConditionIsLoading} />

        {/* Header */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Svg.ArrowBack />
        </TouchableOpacity>

        <Text style={styles.HeadText}>{profileTermAndConditionData?.data?.title}</Text>

        <ScrollView>
          {/<[a-z][\s\S]*>/i.test(content) ? (
            <RenderHtml contentWidth={width} source={{ html: content }} />
          ) : (
            <Text style={styles.termsAndConditionText}>{content}</Text>
          )}
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
  HeadText: {
    fontSize: theme.fontSizes.size_30,
    fontWeight: '600',
    marginTop: theme.verticalSpacing.space_50,
    marginBottom: theme.verticalSpacing.space_20,
  },
  termsAndConditionText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: '400',
  },
});
