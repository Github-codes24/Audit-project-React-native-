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
import Loader from "../../reusableComponent/loader/loader";
const LoginScreen=({navigation})=>{
    
    const dispatch=useDispatch()
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [isRememberChecked,setIsRemberChecked]=useState(false)
   const [isPasswordVisible, setIsPasswordVisible] = useState(false)

const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

const loginResponse=useSelector(getLoginResponse)
  
 const [loginApi,{
    isLoading: isLoginApiLoading,
      isSuccess: isLoginApiSuccess,
      isError: isLoginApiError,
      error: loginApiError,
      data:loginApiData,
}]=useLoginApiMutation()

// console.log("isLoginApiLoading:", isLoginApiLoading);
// console.log("isLoginApiSuccess:", isLoginApiSuccess);
// console.log("loginApiError:", loginApiError);
// console.log("loginApiData:", loginApiData);


const handleSignIn = () => {
loginApi({ email: email, password: password })
     
};

useEffect(()=>{
    if(isLoginApiSuccess){
    dispatch(setLoginResponse(loginApiData))
    alertSuccess('Success','Login Successful')
    }else if(isLoginApiError){
    console.log('loginApiError',loginApiError.data?.message)
    alertError(loginApiError?.data?.message||'Invalid credentials, please try again.')
    }
},[isLoginApiSuccess,loginApiData,loginApiError])


 
return(
    // <BackgroundLayout>
    <View style={{backgroundColor:'#F2F3F5'}}>
      <Loader isLoading={isLoginApiLoading} message={'Please wait...'} />
        <StatusBar backgroundColor={'#F2F3F5'}/>
        <CustomHeader
        onBackPress={()=>navigation.goBack()}
        leftIcon={<Svg.ArrowBack/>}
        title={'Login Here'}
        />
        <Text style={{marginTop:theme.verticalSpacing.space_10,fontWeight:'400',color:theme.lightColor.blackColor,paddingHorizontal:theme.horizontalSpacing.space_20}}>{'Welcome back you have been missed!'}</Text>
       <View style={style.LoginInputView}>
         <Text>Email</Text>
        <CustomTextInput
         value={email}
        onChangeText={(text) => setEmail(text)}
        // leftIcon={<Svg.MessageIcon/>}
        placeholder={'Enter your email address'}
        />
        <Text style={{marginTop:10}}>Password</Text>
         <CustomTextInput
         textColor={'#BABABA'}
          value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!isPasswordVisible}
        placeholder={'Enter your password'}
        rightIcon={
          // Use an SVG eye icon to toggle password visibility
          <View>
            <Text onPress={togglePasswordVisibility}>
              {isPasswordVisible ? <Svg.EyeOpen/> : <Svg.CloseEye/>} {/* Simple eye and eye-slash emoji */}
            </Text>
          </View>
        }
        />
    <View style={{alignItems:"center"}}>
       <TouchableOpacity style={style.forgetView}
       onPress={()=>navigation.navigate(MainRoutes.FORGOT_PASSWORD_SCREEN)}
       >
        <CustomCheckbox
        isChecked={isRememberChecked}
        onPress={()=>setIsRemberChecked(!isRememberChecked)}
        text={'Remember me'}
        />
     <Text style={{color:theme.lightColor.blackColor,fontWeight:'600',textAlign:"right",marginLeft:theme.horizontalSpacing.space_80 }}>{String.forgetPassword}</Text>
    </TouchableOpacity>
    </View>
    
   
    </View>
     <View style={{marginTop:theme.verticalSpacing.space_40}}>
    <CustomButton
    onPress={handleSignIn}
    title={'Log in'}
    />
    </View>
    <View style={{flexDirection:"row",width:'100%',paddingHorizontal:theme.horizontalSpacing.space_20,marginTop:theme.verticalSpacing.space_10}}>
      <Text
      style={{fontSize:theme.fontSizes.size_14,fontWeight:'600'}}
      >{"Don't have an account?"}</Text>
      <TouchableOpacity 
    onPress={()=>navigation.navigate(MainRoutes.REGISTER_SCREEN)}
    >
     <Text style={{fontSize:theme.fontSizes.size_14,fontWeight:'600',color:theme.lightColor.borderColor,marginLeft:5}}>{'Register now'}</Text>
    </TouchableOpacity>
  
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
    eyeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
    forgetView:{
      alignItems:"center",
        width: '100%', 
        // marginTop:theme.verticalSpacing.space_16,
        flexDirection:'row',
        // justifyContent:'space-around',
        // alignItems:"center"
        // marginTop:theme.verticalSpacing.space_10
    }
})
export default LoginScreen;