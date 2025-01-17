import React,{useRef, useState,useEffect} from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../utils";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg'
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
 import { useSelector,useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/apiSlice/authApiSlice";
import { alertError } from "../../utils/Toast";
import { setLoginResponse } from "../../redux/stateSlice/authStateSlice";

   const RegisterScreen=({navigation})=>{
    const inputRef = useRef(null);
    const dispatch=useDispatch()
   
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [firstName,setFirstName]=useState('')
      const [lastName,setLastName]=useState('')
      const [confirmPassword,setConfirmPassword]=useState('')

    
 
const handleRegister = () => {
 
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alertError("Missing Fields", "Please fill out all fields.");
    return;
  }

  // Validate email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailPattern.test(email)) {
    alertError("Invalid email", "Please enter a valid Gmail address.");
    return;
  }

  // Validate password length
  if (password.length < 6) {
    alertError("Password too short", "Password must be at least 6 characters.");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alertError("Passwords don't match", "Please make sure both passwords are the same.");
    return;
  }

  // If all validations pass, navigate to the OTP_SCREEN
  navigation.navigate(MainRoutes.REGISTER_COMPANY_SCREEN, {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
  });
};





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
       <View style={{flexDirection:"row",width:'%',}}>
        <View style={{width:theme.horizontalSpacing.space_187}}>
        <Text style={{}}>First Name</Text>
        </View>
       <View style={{width:theme.horizontalSpacing.space_187,marginLeft:theme.horizontalSpacing.space_10}}>
        <Text style={{}}>Last Name</Text>
        </View> 
      </View>
      <View style={{flexDirection:'row',width:'100%'}}>
        <TextInput
        ref={inputRef}
        value={firstName}
           onChangeText={(text)=>setFirstName(text)}
        style={style.nameTextInput}
        placeholder="First Name"
        />
        <TextInput
        value={lastName}
        onChangeText={(text)=>setLastName(text)}
         style={[style.nameTextInput,{marginLeft:20}]}
          placeholder="Last Name"
        />

      </View>
       {/* <CustomTextInput/> */}
        <Text style={style.TextStyle}>{'Enter your email address'}</Text>
          <CustomTextInput
          value={email}
           onChangeText={(text)=>setEmail(text)}
          // leftIcon={<Svg.MessageIcon/>}
          placeholder={'Enter your email address'}
          />
          <Text style={style.TextStyle}>Password</Text>
           <CustomTextInput
           value={password}
           onChangeText={(text)=>setPassword(text)}
           placeholder={'Password'}
           rightIcon={<Svg.CloseEye/>}
           />
            <Text style={style.TextStyle}> Confirm Password</Text>
            <CustomTextInput
            value={confirmPassword}
            onChangeText={(text)=>setConfirmPassword(text)}
            placeholder={'Confirm password'}
           rightIcon={<Svg.CloseEye/>}
            />
       </View>
       <View style={{marginTop:theme.verticalSpacing.space_165}}>
       <CustomButton
       onPress={handleRegister}
       title={'Next'}
       />
       </View>
    </View>
   </BackgroundLayout>
    )
}
const style=StyleSheet.create({
    nameView:{
        marginTop:theme.verticalSpacing.space_80,
        
    },
    nameTextInput:{
        width:theme.horizontalSpacing.space_173,
        height:theme.verticalSpacing.space_50,
        borderWidth:1,
        borderRadius:8,
        borderColor:theme.lightColor.borderColor,
        // marginTop:10,
        paddingHorizontal:10,
        backgroundColor:theme.lightColor.whiteColor
    },
    TextStyle:{
        marginTop:20
    }
})
export default RegisterScreen;