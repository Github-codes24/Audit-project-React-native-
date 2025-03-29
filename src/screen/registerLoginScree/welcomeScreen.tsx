import React from "react";
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Linking } from "react-native";
import { theme } from "../../utils";
import { MainRoutes } from "../../navigation/routeAndParamsList";

const WelcomeScreen = ({ navigation }) => {
  const LoginNavigation = () => {
    navigation.navigate(MainRoutes.LOGIN_SCREEN);
  };

  const RegisterButton = () => {
    navigation.navigate(MainRoutes.REGISTER_SCREEN);
  };

  const openVerificationLink = () => {
    const url = "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=8006464";
    Linking.openURL(url).catch(err => console.error("Error opening link: ", err));
  };

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={theme.lightColor.brownColor} />

      <View style={style.imageContainer}>
        <Image
          style={style.image}
          source={require('../../assets/images/welcomeImage2.png')}
        />
      </View>

      <View style={style.textContainer}>
        <Text style={style.textStyle}>{'Welcome to Sponsor'}</Text>
        <Text style={[style.textStyle, { marginTop: -5 }]}>{'Licence Compliance Guru'}</Text>
      </View>

      <Text style={style.description}>
        Sponsor licence compliance checker app by Nara Solicitors to check sponsor licence eligibility, sponsor licence compliance score of your business and more.
      </Text>

      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.loginButton} onPress={LoginNavigation}>
          <Text style={style.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.registerButton} onPress={RegisterButton}>
          <Text style={style.registerText}>Get Started Free</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={openVerificationLink} style={style.verificationContainer}>
        <Text style={style.verificationText}>
 {'Authorised and regulated by the Solicitors Regulation.\nSRA No. 8006464.'}
          <Text style={style.verifyHereText}>Verify here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: theme.lightColor.brownColor,
    justifyContent: 'center',
    alignItems: 'center',
    height:'50%',
  borderBottomLeftRadius:10,
  borderBottomRightRadius:10,
  },
  image: {
    width: theme.horizontalSpacing.space_374,
    height: theme.verticalSpacing.space_350,
    alignSelf:"center",
    
  },
  textContainer: {
    justifyContent: 'center',
    marginTop: theme.verticalSpacing.space_40,
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: theme.fontSizes.size_30,
    fontWeight: 'bold',
    color: theme.lightColor.blackColor,
  },
  description: {
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: theme.fontFamily.inter.regular_400,
    fontSize: theme.fontSizes.size_16,
    marginTop: theme.verticalSpacing.space_42,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.verticalSpacing.space_40,
  },
  loginButton: {
    backgroundColor: theme.lightColor.brownColor,
    width: theme.horizontalSpacing.space_170,
    height: theme.verticalSpacing.space_50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  registerButton: {
    backgroundColor: 'white',
    width: theme.horizontalSpacing.space_170,
    height: theme.verticalSpacing.space_50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 0.3,
  },
  loginText: {
    color: theme.lightColor.whiteColor,
    fontWeight: '500',
    fontSize: theme.fontSizes.size_16,
  },
  registerText: {
    color: theme.lightColor.brownColor,
    fontWeight: '500',
    fontSize: theme.fontSizes.size_16,
  },
  verificationContainer: {
    marginTop: theme.verticalSpacing.space_42,
  },
  verificationText: {
    textAlign: 'center',
    fontSize: theme.fontSizes.size_14,
    color: '#000',
    lineHeight: 20,
    marginHorizontal:19
  },
  verifyHereText: {
    color: theme.lightColor.brownColor,
  },
});

export default WelcomeScreen;