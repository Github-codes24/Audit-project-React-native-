import React from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg';
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";

const ForgotPasswordScreen=({navigation})=>{

  return(
    <BackgroundLayout>
    <View style={{}}>
        <CustomHeader
        onBackPress={()=>navigation.goBack()}
        leftIcon={<Svg.ArrowBack/>}
        title={'Forgot Password'}
        />
      <Text style={style.Textstyle}>No worries! Enter your email address below and we will send you a code to reset password.</Text>
      <View style={style.inputView}>
        <Text>E-mail</Text>
        <CustomTextInput
        leftIcon={<Svg.MessageIcon/>}
        placeholder={'Enter your email address'}
        />
         <TouchableOpacity style={style.forgetView}
        onPress={()=>navigation.navigate(MainRoutes.LOGIN_SCREEN)}
             >
               
         <Text style={{ textAlign: 'right', padding: 10,color:theme.lightColor.blackColor,fontWeight:'600' }}>{'Back to login'}</Text>
            </TouchableOpacity>
        <View style={{width:'100%',height:"100%",marginTop:theme.verticalSpacing.space_269}}>
        <CustomButton
        onPress={()=>navigation.navigate(MainRoutes.OTP_SCREEN)}
        title={'Send Reset Instruction'}
        />
        </View>
    </View>
    </View>
    </BackgroundLayout>
)
}
const style=StyleSheet.create({
    main:{
     backgroundColor:"red",
        justifyContent:"center",
        
    },
     forgetView:{
        width: '100%', 
        // marginTop:theme.verticalSpacing.space_10
    },
Textstyle:{
width:theme.horizontalSpacing.space_358,
textAlign:"center",
marginTop:theme.verticalSpacing.space_70,
alignSelf:'center',
// backgroundColor:theme.lightColor.whiteColor,

    },
    
    inputView:{
        marginTop:theme.verticalSpacing.space_100,
        padding:10,
    //    backgroundColor:"white",
       
    }
})
export default ForgotPasswordScreen;