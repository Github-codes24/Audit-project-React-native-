import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../asstets/images/svg'
import BackgroundLayout from '../../reusableComponent/backgroundLayout/backgroundLayout';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { alertError, alertSuccess, ToastComponent } from '../../utils/Toast';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { useResendOtpForRegistrationPasswordApiMutation, useVerifyOtpForRegistrationMutation } from '../../redux/apiSlice/authApiSlice';
import { useSelector,useDispatch } from 'react-redux';
import { setLoginResponse } from '../../redux/stateSlice/authStateSlice';

const EmailVerificationScreen = ({ navigation,route }) => {
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
   const [isSubmitting, setIsSubmitting] = useState(false); // Track submit state to prevent multiple submissions
     const intervalRef = useRef(null);
const dispatch=useDispatch()
  

console.log('otp44',otp)
 const {email}=route?.params||{}
//  console.log('emaill333',email)

const convertOtpToString = (otpArray) => otpArray.join("");

const [verifyOtp,{
   isLoading: verifyOtpApiLoading,
      isSuccess: isVerifyOtpApiSuccess,
      error: verifyOtpApiError,
      data:verifyOtpApiData,
 }]=useVerifyOtpForRegistrationMutation()
 
//  console.log('verifyOtpApiData',verifyOtpApiData,isVerifyOtpApiSuccess)
 
 const handleVerifyAccount=()=>{
 let otpString=convertOtpToString(otp)
 console.log('otpString',otpString)
  verifyOtp({email,otp:otpString})
 }
 
 
 useEffect(() => {
     if (timer > 0) {
       intervalRef.current = setInterval(() => {
         setTimer((prevTimer) => prevTimer - 1);
       }, 1000);
     } else {
       setIsResendDisabled(false);
       clearInterval(intervalRef.current);
     }
     return () => clearInterval(intervalRef.current);
   }, [timer]);

  
useEffect(() => {
  if (isVerifyOtpApiSuccess) {
    
    navigation.navigate(MainRoutes.ACCOUNT_VERIFIED_SCREEN, {
      verifyOtpApiData, 
    });
    alertSuccess('Success', 'Email verification successful');
  } else if (verifyOtpApiError) {
    // console.log('verifyOtpApiError', verifyOtpApiError.data?.message);
    alertError(
      verifyOtpApiError?.data?.message || 'Otp doesn’t match. Please enter a valid OTP.'
    );
  }
}, [isVerifyOtpApiSuccess, verifyOtpApiData, verifyOtpApiError, navigation]);
  


const [ResendOtpRegistrationPasswordApi, {
    isLoading: ResendOtpRegistrationPasswordApisLoading,
  }] = useResendOtpForRegistrationPasswordApiMutation();



const handleResendCode = () => {
     alertSuccess('send')
    if (!isResendDisabled) {
      setTimer(30); 
      setIsResendDisabled(true); 
   ResendOtpRegistrationPasswordApi({email})
    console.log('Code resent!');
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs[index + 1]?.focus();
    }
  };

  const inputs = [];


  return (
    <BackgroundLayout>
    <View style={styles.container}>
     
      <CustomHeader
      onBackPress={()=>navigation.goBack()}
      leftIcon={<Svg.ArrowBack/>}
      title={'Email Verification'}
      />
       {/* <Text style={styles.heading}>Check Your Email</Text> */}
      <Text style={styles.description}>
        Code sent to <Text style={styles.email}>{email}</Text>.Please enter the code below
      </Text>
      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => (inputs[index] = ref)}
          />
        ))}
      </View>
       
      <View style={{marginTop:theme.verticalSpacing.space_156}}>
       <CustomButton
       onPress={handleVerifyAccount}
       title={'Verify Account'}
       />
       </View>
 <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t receive Code?</Text>
        <TouchableOpacity
         onPress={handleResendCode}
          disabled={isResendDisabled}
        >
          <Text style={[styles.resendLink, isResendDisabled && { color: 'gray' },]}> Resend Code</Text>
        </TouchableOpacity>
      </View>
      
        <Text style={styles.timerText}>Resend Code in 00:{timer < 10 ? `0${timer}` : timer}</Text>
      {/* Resend Code Section */}
      

      {/* Timer */}
     
    </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#F9F5F2',
    // paddingHorizontal: 20,
    // paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top:theme.verticalSpacing.space_20,
    left:theme.horizontalSpacing.space_20,
  },
  backArrow: {
    fontSize:theme.fontSizes.size_24,
    color: '#000',
  },
  heading: {
    fontSize: theme.fontSizes.size_24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3D3D3D',
    marginTop: 50,
  },
  description: {
    width:theme.horizontalSpacing.space_370,
    fontSize: theme.fontSizes.size_18,
    color: '#3D3D3D',
    marginVertical: 20,
    marginHorizontal:20,
    fontWeight:'400',
    marginTop:theme.verticalSpacing.space_80,
    lineHeight:20
  },
  email: {
    fontWeight: 'bold',
    color:theme.lightColor.borderColor,
  },
  otpContainer: {
    alignItems:"center",
    // justifyContent:"center",
    flexDirection: 'row',
    marginTop:theme.verticalSpacing.space_100,
    
    // marginTop: 20,
    paddingHorizontal:theme.horizontalSpacing.space_20,
    // backgroundColor:'red'
  },
  otpInput: {
    margin:5,
    width:theme.horizontalSpacing.space_60,
    height:theme.verticalSpacing.space_60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor:theme.lightColor.borderColor,
    textAlign: 'center',
    fontSize: theme.fontSizes.size_18,
    backgroundColor:"white"
   
  },
  submitButton: {
    // marginTop: 30,
    backgroundColor: '#6A1B9A',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: theme.fontSizes.size_16,
  },
  resendContainer: {
    // backgroundColor:"red",
    flexDirection: 'row',
    paddingHorizontal:theme.horizontalSpacing.space_30,
    // justifyContent: 'center',
    marginTop:theme.verticalSpacing.space_20,
  },
  resendText: {
    color: '#3D3D3D',
    fontSize:theme.fontSizes.size_16,
    fontWeight:'600'
    
  },
  resendLink: {
    color: '#6A1B9A',
    fontWeight: '600',
    fontSize:theme.fontSizes.size_16,
    
  },
  timerText: {
    paddingHorizontal:theme.horizontalSpacing.space_30,
    // textAlign: 'center',
    marginTop:5,
    color: '#3D3D3D',
    fontSize:theme.fontSizes.size_16,
    fontWeight:'600'
  },
});

export default EmailVerificationScreen;
