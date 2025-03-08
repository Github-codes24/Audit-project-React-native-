import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../assets/images/svg'
import BackgroundLayout from '../../reusableComponent/backgroundLayout/backgroundLayout';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { alertError, alertSuccess, ToastComponent } from '../../utils/Toast';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { useResendOtpForRegistrationPasswordApiMutation, useVerifyOtpForRegistrationMutation } from '../../redux/apiSlice/authApiSlice';
import { useSelector,useDispatch } from 'react-redux';
import { setLoginResponse } from '../../redux/stateSlice/authStateSlice';
import CustomModal from '../../reusableComponent/customModal/customModal';
import { getFcmToken } from '../../redux/stateSelector';

const EmailVerificationScreen = ({ navigation,route }) => {
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
   const [isModalVisible, setModalVisible] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const intervalRef = useRef(null);
  const dispatch=useDispatch()
  
const FcmToken=useSelector(getFcmToken)



// console.log('otp44',otp)
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
  verifyOtp({email,otp:otpString,fcmToken:FcmToken})
 }
 
const closeModal = () => {
    setModalVisible(false);
  };


 
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
    // alertSuccess('Success', 'Email verification successful');
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
  if (!isResendDisabled) {
    setModalVisible(true); 
    setTimer(30); 
    setIsResendDisabled(true);
    ResendOtpRegistrationPasswordApi({ email });
  }
};

  

  const inputs = [];


const handleChange = (text, index) => {
    const newOtp = [...otp];
    const isBackspace = text === ''; 
    newOtp[index] = text;
    setOtp(newOtp);
    if (!isBackspace && text && index < otp.length - 1) {
      inputs[index + 1]?.focus(); 
    } else if (isBackspace && index > 0) {
      inputs[index - 1]?.focus(); 
    }
  };


  return (
    <SafeAreaView>
    <View style={styles.container}>
       <CustomModal
          visible={isModalVisible}
          onClose={closeModal}
          title="Code sent!"
          description={"Code has been sent to your email please check your email"}
          buttons={[
            {
              label: "Verify code",
              type: "primary",
              onPress: () => {
                closeModal();
              },
            },
          ]}
        />
     <View style={{}}>
      <CustomHeader
      onBackPress={()=>navigation.goBack()}
      leftIcon={<Svg.ArrowBack/>}
      title={'Verify Your Email'}
      sub
      />
      </View>
       {/* <Text style={styles.heading}>Check Your Email</Text> */}
      <Text style={styles.description}>
       We have sent a 4-digit code to your email <Text style={styles.email}>{email} </Text>. Please check your inbox and spam folder.
      </Text>

       <Text style={{marginTop:theme.verticalSpacing.space_20,fontSize:theme.fontSizes.size_16}}>{'Please enter the code below to verify your account.'}</Text>



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
       
      <View style={{marginTop:theme.verticalSpacing.space_114}}>
       <CustomButton
       onPress={handleVerifyAccount}
       title={'Verify account'}
       />
       </View>
 <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t receive code?</Text>
        <TouchableOpacity
         onPress={handleResendCode}
          disabled={isResendDisabled}
        >
         <Text   style={[styles.resendLink,   { textDecorationLine: 'underline' }, isResendDisabled && { color: 'gray' },]}> Resend code</Text> 
        </TouchableOpacity>
      </View>
      
        <Text style={styles.timerText}>Resend code in 00:{timer < 10 ? `0${timer}` : timer}</Text>
      {/* Resend Code Section */}
      

      {/* Timer */}
     
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#F9F5F2',
    paddingHorizontal:19,
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
    width:theme.horizontalSpacing.space_374,
    fontSize: theme.fontSizes.size_16,
    color: '#3D3D3D',
    // height:60,
    fontWeight:'400',
    marginTop:theme.verticalSpacing.space_20,
    lineHeight:22,
   
    marginVertical:5,
  
    
  },
  email: {
    fontWeight: '400',
    color:theme.lightColor.borderColor,
    fontSize:theme.fontSizes.size_16
  },
  otpContainer: {
    alignItems:"center",
    // justifyContent:"center",
    flexDirection: 'row',
    marginTop:theme.verticalSpacing.space_40,
    
    // marginTop: 20,
  
    // backgroundColor:'red'
  },
  otpInput: {
    margin:5,
    width:theme.horizontalSpacing.space_50,
    height:theme.verticalSpacing.space_50,
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
    marginLeft:5
    
  },
  timerText: {
    
    // textAlign: 'center',
    marginTop:5,
    color: '#3D3D3D',
    fontSize:theme.fontSizes.size_16,
    fontWeight:'600'
  },
});

export default EmailVerificationScreen;
