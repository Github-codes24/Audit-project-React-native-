import React,{useState,useEffect} from "react";
import { View,Text, StyleSheet } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg';
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { useResetPasswordApiMutation } from "../../redux/apiSlice/authApiSlice";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { alertSuccess } from "../../utils/Toast";
const CreateNewPassword=({navigation,route})=>{

const [newPassword,setNewPassword]=useState('')
const [confirmPassword,setConfirmPassword]=useState('')

const {email}=route.params||{}
console.log("email11111",email)

const [resetPasswordApi,{
   isLoading: resetPasswordApiLoading,
      isSuccess: isResetPasswordApiSuccess,
      error: resetPasswordApiError,
      data:resetPasswordpApiData,
 }]=useResetPasswordApiMutation()

const handleResetPassword=()=>{
resetPasswordApi({email,newPassword,confirmPassword})
}

 useEffect(()=>{
    if(isResetPasswordApiSuccess){
        navigation.navigate(MainRoutes?.CHANGE_PASSWORD_SUCCESSFULLY_SCREEN)
       alertSuccess('Success','Password change successfully')
    }else if(resetPasswordApiError){
    console.log('loginApiError',resetPasswordApiError.data?.message)
    alertError(resetPasswordApiError?.data?.message||'Otp don,t match,Please enter valid Otp')
    }
 },[isResetPasswordApiSuccess,resetPasswordApiError,resetPasswordpApiData])

  return(
    <BackgroundLayout>
    <View style={{backgroundColor:'#F2F3F5',height:'100%'}}>
        <CustomHeader
         onBackPress={()=>navigation.goBack()}
        leftIcon={<Svg.ArrowBack/>}
        title={'Create New Password'}
        />
      <Text style={style.Textstyle}>Please enter and confirm your new password.You will need to login after you reset.</Text>
      <View style={style.inputView}>
        <Text>New Password</Text>
        <CustomTextInput
        value={newPassword}
        onChangeText={(text)=>setNewPassword(text)}
        placeholder={'New password'}
         rightIcon={<Svg.EyeOpen/>}
        />
       <Text style={{marginLeft:8}}>{'must have 8 char.'}</Text>
        <Text style={{marginTop:20}}>Confirm Password</Text>
        <CustomTextInput
         value={confirmPassword}
        onChangeText={(text)=>setConfirmPassword(text)}
         placeholder={'Confirm password'}
         rightIcon={<Svg.EyeOpen/>}
        />
        <View style={{width:'100%',height:"100%",marginTop:theme.verticalSpacing.space_165}}>
        <CustomButton
        onPress={handleResetPassword}
        title={'Reset Password'}
        />
        </View>
    </View>
    </View>
    </BackgroundLayout>
)
}
const style=StyleSheet.create({
    main:{
        width:"100%",
        justifyContent:"center"
    },
Textstyle:{
width:theme.horizontalSpacing.space_358,
textAlign:"center",
marginTop:theme.verticalSpacing.space_100,
alignSelf:'center',
color:'#475569'
    },
    
    inputView:{
        marginTop:theme.verticalSpacing.space_100,
        padding:10,  
    }
})
export default CreateNewPassword;