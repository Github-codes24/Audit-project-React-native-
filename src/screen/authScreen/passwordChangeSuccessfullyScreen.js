import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../utils";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";

const PasswordChnageSuccessFullyScreen=({navigation})=>{
    return(
        <View style={style.main}>
            <View style={{alignItems:"center",justifyContent:"center",height:'100%'}}>
            <Image
            style={{width:theme.horizontalSpacing.space_327,height:273}}
            source={require('../../asstets/images/passwordChange.png')}
            />
           <Text style={{alignSelf:"center",textAlign:"center",width:285,height:68,fontWeight:'600',fontSize:theme.fontSizes.size_30,margin:theme.horizontalSpacing.space_16}}>Password Chnage Successfully</Text>
            <Text style={{width:361,height:60,lineHeight:20,fontSize:theme.fontSizes.size_16,letterSpacing:1,color:theme.lightColor.blackColor}}>{'Your password has been changed successfully You can now use your new password to login to your account.'}</Text>
            <View style={{margin:theme.verticalSpacing.space_30}}>
            <CustomButton
            onPress={()=>navigation.navigate(MainRoutes.LOGIN_SCREEN)}
            title={'Login'}
            />
            </View>
            </View>
           
        </View>
    )
}
const style=StyleSheet.create({
  main:{ flex:1
  }
})
export default PasswordChnageSuccessFullyScreen;