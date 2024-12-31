import React from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import { String, theme } from "../../utils";
import * as Svg from '../../asstets/images/svg';
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
const LoginScreen=({navigation})=>{
return(
    <BackgroundLayout>
    <View style={{}}>
        <CustomHeader
        title={'Login Here'}
        />
        <Text style={{textAlign:"center",marginTop:theme.verticalSpacing.space_56,width:180,alignSelf:"center",fontWeight:'400',color:theme.lightColor.brownColor}}>{'Welcome back you have been missed!'}</Text>
       <View style={style.LoginInputView}>
         
        <CustomTextInput
        leftIcon={<Svg.MessageIcon/>}
        placeholder={'Enter your email address'}
        />
        
         <CustomTextInput
        placeholder={'Enter your password'}
        rightIcon={<Svg.EyeOpen/>}
        />
       <TouchableOpacity style={style.forgetView}
       onPress={()=>navigation.navigate(MainRoutes.FORGOT_PASSWORD_SCREEN)}
       >
     <Text style={{ textAlign: 'right', padding: 10,color:theme.lightColor.blackColor,fontWeight:'600' }}>{String.forgetPassword}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width:'100%',height:78,alignItems:"center",justifyContent:"center",marginTop:theme.verticalSpacing.space_40}}>
   <Svg.LoginBack/>
    </TouchableOpacity>
    <TouchableOpacity style={{width:'100%',alignItems:"center",justifyContent:"center",marginTop:theme.verticalSpacing.space_40}}>
     <Text style={{fontSize:theme.fontSizes.size_16,fontWeight:'600',color:theme.lightColor.brownColor}}>{'Create new account'}</Text>
    </TouchableOpacity>
    </View>
     <View style={{marginTop:theme.verticalSpacing.space_40}}>
    <CustomButton
    title={'Sign in'}
    />
    </View>
    </View>
    </BackgroundLayout>
)
}
const style=StyleSheet.create({
    LoginInputView:{
        marginTop:theme.verticalSpacing.space_60,
// backgroundColor:'red',
//    height:'70%',
   justifyContent:'center',
   paddingHorizontal:10
    },
    password:{
        marginTop:10
    },
    forgetView:{
        width: '100%', 
        // marginTop:theme.verticalSpacing.space_10
    }
})
export default LoginScreen;