import React from "react";
import { View,Text } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg'
import { theme } from "../../utils";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
const RegisterCompanyScreen=({navigation})=>{
return(
    <BackgroundLayout>
    <View style={{padding:10}}>
        <CustomHeader
        leftIcon={<Svg.ArrowBack/>}
        title={'Register'}
        onBackPress={()=>navigation.goBack()}
        />
        <View style={{marginTop:theme.verticalSpacing.space_46}}>
         <CustomTextInput
         placeholder={'Company Name'}
         />
          <CustomTextInput
          placeholder={'Phone Number'}
          />
           <CustomTextInput
           placeholder={'Type of company'}
           />
           </View>
            <View style={{marginTop:theme.verticalSpacing.space_320}}>
       <CustomButton
       onPress={()=>navigation.navigate(MainRoutes.REGISTER_COMPANY_SCREEN)}
       title={'Next'}
       />
       </View>
    </View>
    </BackgroundLayout>
)
}

export default RegisterCompanyScreen;