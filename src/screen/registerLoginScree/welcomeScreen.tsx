import React from "react";
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Linking } from "react-native";
import CustomButton from "../../reusableComponent/button/button";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from "../../assets/images/svg";
import { theme } from "../../utils";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";

const WelcomeScreen = ({ navigation }) => {
 
  const LoginNavigation = () => {
    navigation.navigate(MainRoutes.LOGIN_SCREEN);
  };

  const RegisterButton = () => {
    navigation.navigate(MainRoutes.REGISTER_SCREEN);
  };

  // Function to handle the deep linking on "Verify here" text
  const openVerificationLink = () => {
    const url = "https://www.sra.org.uk/consumers/register/";
    Linking.openURL(url).catch(err => console.error("Error opening link: ", err));
  };
   
  return (
    <View style={{ marginHorizontal: 19 }}>
      <StatusBar backgroundColor={'#F2F3F5'} />

      <View style={{ height: '100%', alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: theme.horizontalSpacing.space_236, height: theme.verticalSpacing.space_347 }}
          source={require('../../assets/images/welcomeImage.png')}
        />
        <View style={{ justifyContent: "center", marginTop: theme.verticalSpacing.space_20 }}>
          <Text style={style.textStyle}>{'Welcome to Sponsor'}</Text>
          <Text style={[style.textStyle, { marginTop: -5 }]}>{'Licence Compliance Guru'}</Text>
        </View>

        <View style={{ width: theme.horizontalSpacing.space_374 }}>
  <Text 
    style={{ 
      lineHeight:20, 
      textAlign: "center", 
      fontFamily:theme.fontFamily.inter.regular_400, 
      fontSize: theme.fontSizes.size_16, 
      marginTop: theme.verticalSpacing.space_44, 
      alignSelf: 'center', 
      // paddingHorizontal: theme.horizontalSpacing.space_10 
    }}>
    Sponsor licence compliance checker app by Nara Solicitors to check sponsor licence eligibility, sponsor licence compliance score of your business and more.
  </Text>
</View>


        <View style={{  alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: "row", marginHorizontal: theme.horizontalSpacing.space_20, }}>
            <TouchableOpacity style={[style.button, {}]} onPress={LoginNavigation}>
              <Text style={{ textAlign: "center", color: theme.lightColor.whiteColor, fontWeight: '500', fontSize: theme.fontSizes.size_16 }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[style.button, { backgroundColor: 'white', borderWidth: 0.3 }]} onPress={RegisterButton}>
              <Text style={{ color: theme.lightColor.brownColor, fontWeight: '500', fontSize: theme.fontSizes.size_16 }}>{'Get Started Free'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ position: 'absolute', bottom: theme.verticalSpacing.space_30 }}>
          <TouchableOpacity onPress={openVerificationLink}>
            <Text style={{ textAlign: 'center', fontSize: theme.fontSizes.size_14, color: 'gray',lineHeight:22 }}>
              {'Authorised and regulated by the Solicitors Regulation. SRA No. 8006464. '}
              
              <Text style={{ color: theme.lightColor.brownColor }}>{'Verify here'}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    fontSize: theme.fontSizes.size_30,
    fontWeight: 'bold',
    color: theme.lightColor.blackColor,
  },
  button: {
    marginHorizontal:10,
    width: theme.horizontalSpacing.space_170,
    height: theme.verticalSpacing.space_50,
    backgroundColor: theme.lightColor.brownColor,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: "center",
    marginTop: theme.verticalSpacing.space_40,
    
  }
});

export default WelcomeScreen;
