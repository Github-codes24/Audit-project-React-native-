import React from "react";
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from "react-native";
import CustomButton from "../../reusableComponent/button/button";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from "../../asstets/images/svg";
import { theme } from "../../utils";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";

const WelcomeScreen = ({ navigation }) => {
 
  const LoginNavigation=()=>{
    navigation.navigate(MainRoutes.LOGIN_SCREEN)
  }

const RegisterButton=()=>{
  navigation.navigate(MainRoutes.REGISTER_SCREEN)
}
  return (
    <BackgroundLayout>
    <View>
      <StatusBar
        barStyle="light-content" 
        backgroundColor={theme.lightColor.whiteColor}  
      />
      <View style={{ height: '100%',alignItems:"center",justifyContent:'center' }}>
        <Image
        style={{width:theme.horizontalSpacing.space_236,height:theme.verticalSpacing.space_269,}}
        source={require('../../asstets/images/welcomeImage.png')}
        />
        <Text style={style.textStyle}>{'Welcome'}</Text>
        <View style={{width:theme.horizontalSpacing.space_230}}>
        <Text style={{textAlign:"center",fontWeight:'600',color:"#592951",fontSize:theme.fontSizes.size_20,margin:20}}>{'Discover Your Dream Job Here'}</Text>
        <Text style={{textAlign:"center",fontWeight:'400',fontSize:theme.fontSizes.size_14}}>{'Explore all the existing job roles based on your interest and study major'}</Text>
        <TouchableOpacity style={style.button}
        onPress={LoginNavigation}
        >
          <Text style={{textAlign:"center"}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.button,{marginTop:20}]}
        onPress={RegisterButton}
        >
          <Text style={{textAlign:"center"}}>{'Register'}</Text>
        </TouchableOpacity>
       </View>
      </View>
    </View>
    </BackgroundLayout>
  );
};

const style = StyleSheet.create({
  RegisterLoginView: {
    // width: '100%',
    // height: '75%',
    // marginTop: 30,
    // alignItems: "center",
    // justifyContent: 'center',
  },
  textViewStyle: {
    marginVertical: 20,
    color: 'black',
  },
  textStyle: {
    textAlign: "center",
     marginTop: theme.verticalSpacing.space_20,
    fontSize: theme.fontSizes.size_30,
    fontWeight: 'bold',
    color: theme.lightColor.brownColor,
  },
  button:{
    width:theme.horizontalSpacing.space_170,
    height:theme.verticalSpacing.space_46,
    backgroundColor:theme.lightColor.orangeColor,
    alignItems:"center",
   justifyContent:'center',
    borderRadius:10,
    alignSelf:"center",
    marginTop:theme.verticalSpacing.space_40
  }
});

export default WelcomeScreen;
