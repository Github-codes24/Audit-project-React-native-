import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../utils";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg'
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
const RegisterScreen=({navigation})=>{
    return(
    <BackgroundLayout>
     <View style={{padding:10}}>
       <CustomHeader
       titleColor=""
       title={'Register Account'}
       leftIcon={<Svg.ArrowBack/>}
       onBackPress={()=>navigation.goBack()}
       />
       <View style={style.nameView}>
       <View style={{flexDirection:"row",width:'70%',justifyContent:'space-between'}}>
       {/* <Text style={{}}>First Name</Text>
      <Text>Last Name</Text> */}
      </View>
      <View style={{flexDirection:'row',width:'100%'}}>
        <TextInput
        style={style.nameTextInput}
        placeholder="First Name"
        />
        <TextInput
         style={[style.nameTextInput,{marginLeft:20}]}
          placeholder="Last Name"
        />

      </View>
       {/* <CustomTextInput/> */}
        {/* <Text style={style.TextStyle}>E-mail</Text> */}
          <CustomTextInput
          leftIcon={<Svg.MessageIcon/>}
          placeholder={'Enter your email address'}
          />
          {/* <Text style={style.TextStyle}>Password</Text> */}
           <CustomTextInput
           placeholder={'Password'}
           rightIcon={<Svg.EyeOpen/>}
           />
            {/* <Text style={style.TextStyle}> Confirm Password</Text> */}
            <CustomTextInput
            placeholder={'Confirm password'}
            rightIcon={<Svg.EyeOpen/>}
            />
       </View>
       <View style={{marginTop:theme.verticalSpacing.space_230}}>
       <CustomButton
       onPress={()=>navigation.navigate(MainRoutes.REGISTER_COMPANY_SCREEN)}
       title={'Next'}
       />
       </View>
    </View>
   </BackgroundLayout>
    )
}
const style=StyleSheet.create({
    nameView:{
        marginTop:theme.verticalSpacing.space_80
        
    },
    nameTextInput:{
        width:theme.horizontalSpacing.space_173,
        height:theme.verticalSpacing.space_46,
        borderWidth:1,
        borderRadius:8,
        borderColor:theme.lightColor.grayColor,
        marginTop:10,
        paddingHorizontal:10,
        backgroundColor:theme.lightColor.orangeColor
    },
    TextStyle:{
        marginTop:20
    }
})
export default RegisterScreen;