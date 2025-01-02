import React,{useEffect, useState} from "react";
import { View,Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import { String, theme } from "../../utils";
import * as Svg from '../../asstets/images/svg';
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";
import { useLoginApiMutation } from "../../redux/apiSlice/authApiSlice";
import { alertError, alertSuccess } from "../../utils/Toast";
import { setLoginResponse } from "../../redux/stateSlice/authStateSlice";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector,useDispatch } from "react-redux";

const LoginScreen=({navigation})=>{
    
    const dispatch=useDispatch()
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginResponse=useSelector(getLoginResponse)
  console.log('loginResponse3652452367',loginResponse)
    


 const [loginApi,{
    isLoading: isLoginApiLoading,
      isSuccess: isLoginApiSuccess,
      error: loginApiError,
      data:loginApiData,
}]=useLoginApiMutation()

console.log("isLoginApiLoading:", isLoginApiLoading);
console.log("isLoginApiSuccess:", isLoginApiSuccess);
console.log("loginApiError:", loginApiError);
console.log("loginApiData:", loginApiData);


const handleSignIn = () => {
loginApi({ email: email, password: password })
     
};

useEffect(()=>{
    if(isLoginApiSuccess){
    dispatch(setLoginResponse(loginApiData))
    alertSuccess('Success','Login Successful')
    }else if(loginApiError){
    console.log('loginApiError',loginApiError.data?.message)
    alertError(loginApiError?.data?.message||'Invalid credentials, please try again.')
    }
},[isLoginApiSuccess,loginApiData,loginApiError])


 const [isRememberChecked,setIsRemberChecked]=useState(false)
return(
    // <BackgroundLayout>
    <View style={{backgroundColor:'#F2F3F5'}}>
        <StatusBar backgroundColor={'#F2F3F5'}/>
        <CustomHeader
        onBackPress={()=>navigation.goBack()}
        leftIcon={<Svg.ArrowBack/>}
        title={'Login Here'}
        />
        <Text style={{textAlign:"center",marginTop:theme.verticalSpacing.space_56,width:180,alignSelf:"center",fontWeight:'400',color:theme.lightColor.brownColor}}>{'Welcome back you have been missed!'}</Text>
       <View style={style.LoginInputView}>
         <Text>Email</Text>
        <CustomTextInput
         value={email}
        onChangeText={(text) => setEmail(text)}
        leftIcon={<Svg.MessageIcon/>}
        placeholder={'Enter your email address'}
        />
        <Text style={{marginTop:10}}>Password</Text>
         <CustomTextInput
          value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'Enter your password'}
        rightIcon={<Svg.EyeOpen/>}
        />
       <TouchableOpacity style={style.forgetView}
       onPress={()=>navigation.navigate(MainRoutes.FORGOT_PASSWORD_SCREEN)}
       >
        <CustomCheckbox
        isChecked={isRememberChecked}
        onPress={()=>setIsRemberChecked(!isRememberChecked)}
        text={'Remember me'}
        />
     <Text style={{color:theme.lightColor.blackColor,fontWeight:'600',textAlign:"right",marginLeft:theme.horizontalSpacing.space_100 }}>{String.forgetPassword}</Text>
    </TouchableOpacity>
    
    
    <TouchableOpacity style={{width:'100%',alignItems:"center",justifyContent:"center",marginTop:theme.verticalSpacing.space_40}}
    onPress={()=>navigation.navigate(MainRoutes.REGISTER_SCREEN)}
    >
     <Text style={{fontSize:theme.fontSizes.size_16,fontWeight:'600',color:theme.lightColor.brownColor}}>{'Create new account'}</Text>
    </TouchableOpacity>
    </View>
     <View style={{marginTop:theme.verticalSpacing.space_40}}>
    <CustomButton
    onPress={handleSignIn}
    title={'Sign in'}
    />
    </View>
    </View>
    // </BackgroundLayout>
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
        marginTop:10,
        flexDirection:'row',
        // justifyContent:'space-around',
        // alignItems:"center"
        // marginTop:theme.verticalSpacing.space_10
    }
})
export default LoginScreen;