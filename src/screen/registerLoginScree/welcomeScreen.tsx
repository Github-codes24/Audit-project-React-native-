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
    <View style={{padding:19,}}>
      <StatusBar
        barStyle="light-content" 
        backgroundColor={theme.lightColor.whiteColor}  
      />
      <View style={{ height: '100%',alignItems:"center",justifyContent:'center' }}>
        <Image
        style={{width:theme.horizontalSpacing.space_236,height:theme.verticalSpacing.space_347,}}
        source={require('../../asstets/images/welcomeImage.png')}
        />
        <View style={{width:267,marginHorizontal:73,}}>
        <Text style={style.textStyle}>{'Welcome to Compliance Portal'}</Text>
        </View>
        <View style={{}}>
        

      <View style={{marginLeft:41,marginRight:42}}>
        <Text style={{lineHeight:20,textAlign:"center",fontWeight:'400',fontSize:theme.fontSizes.size_18,marginTop:theme.verticalSpacing.space_20,width:329,alignSelf:'center',}}>{'Securely manage your compliance and sponsor license requirements in one place'}</Text>
        </View>
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
        
         <TouchableOpacity style={[style.button,{marginRight:10}]}
        onPress={LoginNavigation}
        >
          <Text style={{textAlign:"center",color:theme.lightColor.whiteColor}}>Login</Text>
        </TouchableOpacity>
       
        
         <TouchableOpacity style={[style.button,{backgroundColor:'white',borderWidth:.3,marginHorizontal:10}]}
        onPress={RegisterButton}
        >
          <Text style={{color:theme.lightColor.brownColor}}>{'Get Started Free'}</Text>
        
        
        </TouchableOpacity>
       
        </View>
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
    width:theme.horizontalSpacing.space_260,
    textAlign: "center",
     marginTop: theme.verticalSpacing.space_20,
    fontSize: theme.fontSizes.size_30,
    fontWeight: 'bold',
    color: theme.lightColor.blackColor,
  },
  button:{
    width:theme.horizontalSpacing.space_170,
    height:theme.verticalSpacing.space_50,
    backgroundColor:theme.lightColor.brownColor,
    alignItems:"center",
   justifyContent:'center',
    borderRadius:10,
    alignSelf:"center",
    // marginLeft:10,
    marginTop:theme.verticalSpacing.space_40
  }
});

export default WelcomeScreen;
