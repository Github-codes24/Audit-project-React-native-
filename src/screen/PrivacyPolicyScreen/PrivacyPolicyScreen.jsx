import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import * as Svg from '../../asstets/images/svg';
  import {theme} from '../../utils';
  const PrivacyPolicyScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        {/* Header */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Svg.ArrowBack />
        </TouchableOpacity>
  
        <Text style={styles.HeadText}>Privacy Policy</Text>
        <ScrollView>
          <Text style={styles.privactpolicyText}>
          Welcome to [Your Business/Service Name]! These terms and conditions outline the rules and regulations for using our services. By accessing or using our website, application, or services, you agree to comply with these terms.
You must use our services in compliance with all applicable laws and regulations. Unauthorized use, including attempts to disrupt or exploit the platform, is strictly prohibited.
Content provided by the company, including designs, text, and graphics, is proprietary and protected. Users retain ownership of any content they submit but grant us permission to use it as necessary to deliver services.
Details of pricing, subscription, and payment terms are provided separately. Refund policies, if applicable, are clearly defined in the [Refund Policy section].
Your data privacy and security are of utmost importance to us. See our Privacy Policy for more details.
We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
We reserve the right to suspend or terminate your access if you violate these terms.
Terms and conditions may be updated periodically. Continued use after updates implies acceptance of the revised terms.
By continuing to use our platform, you acknowledge that you have read, understood, and agree to these terms and conditions. For any questions or clarifications, please contact us at [Support Email/Contact Information].
4o
          </Text>
        </ScrollView>
      </View>
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
      marginTop: theme.verticalSpacing.space_80,
      marginBottom: theme.verticalSpacing.space_20,
    },
    privactpolicyText: {
      fontSize: theme.fontSizes.size_16,
      fontWeight: '400',
    },
  });
  