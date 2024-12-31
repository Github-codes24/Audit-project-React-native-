import React from "react";
import { View,Text, StyleSheet } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg';
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";

const CreateNewPassword=({navigation})=>{

  return(
    <BackgroundLayout>
    <View style={{}}>
        <CustomHeader
         onBackPress={()=>navigation.goBack()}
        leftIcon={<Svg.ArrowBack/>}
        title={'Create New Password'}
        />
      <Text style={style.Textstyle}>Please enter and confirm your new password.You will need to login after you reset.</Text>
      <View style={style.inputView}>
      
        <CustomTextInput
        placeholder={'New password'}
         rightIcon={<Svg.EyeOpen/>}
        />
       <Text style={{marginLeft:8}}>{'must have 8 char.'}</Text>
        <CustomTextInput
         placeholder={'Confirm password'}
         rightIcon={<Svg.EyeOpen/>}
        />
        <View style={{width:'100%',height:"100%",marginTop:theme.verticalSpacing.space_165}}>
        <CustomButton
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