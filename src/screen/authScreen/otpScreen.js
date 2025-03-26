import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../assets/images/svg';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { alertSuccess, alertError } from '../../utils/Toast';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { useResendOtpForgotPasswordApiMutation, useVerifyOtpForgotPasswordMutation } from '../../redux/apiSlice/authApiSlice';
import CustomModal from '../../reusableComponent/customModal/customModal';

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
   const [isModalVisible, setModalVisible] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  const [errorText, setErrorText] = useState('');
 
 
  const intervalRef = useRef(null);
  const inputs = []; 

  const { email } = route.params || {};

  const [forgotPasswordVerifyOtp, { isSuccess: isVerifySuccess, error: verifyError, data: verifyData }] = useVerifyOtpForgotPasswordMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResendOtpForgotPasswordApiMutation();

  const convertOtpToString = (otpArray) => otpArray.join("");

  const handleForgotPasswordVerifyAccount = () => {
    // if (otp.includes('')) {
    //   setErrorText('Please enter the complete OTP');
    //   return;
    // }

    const otpString = convertOtpToString(otp);
    setIsSubmitting(true);
    forgotPasswordVerifyOtp({ email, otp: otpString });
  };



  useEffect(() => {
  if (isVerifySuccess && verifyData?.success) {
    navigation.navigate(MainRoutes.CREATE_NEW_PASSWORD, { email });
  } else if (verifyError || !verifyData?.success) {
    const errorMessage = verifyError?.data?.message;
    setErrorText(errorMessage);
  }
  setIsSubmitting(false);
}, [isVerifySuccess, verifyData, verifyError, navigation]);


 
 
  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timer]);


  const handleResendCode = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true);
       setModalVisible(true); 
      setTimer(30);
      resendOtp({ email });
    
    }
  };


const closeModal = () => {
    setModalVisible(false);
  };

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
    <ScrollView>
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


        <View style={{ }}>
          <CustomHeader
            onBackPress={() => navigation.goBack()}
            leftIcon={<Svg.ArrowBack />}
            title={'Check your email'}
          />
        </View>
        <Text style={styles.description}>
         We have sent a 4-digit code to your email <Text style={styles.email}>{email} </Text>. Please check your inbox and spam folder.
        </Text>

     <Text style={{fontSize:theme.fontSizes.size_16,fontWeight:'400'}}>{'Please enter the code below to verify your account.'}</Text>
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
              ref={(ref) => (inputs[index] = ref)} // Store input references
            />
          ))}
        </View>
         {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
        <View style={{ marginTop: theme.verticalSpacing.space_114 }}>
          <CustomButton
            
            onPress={handleForgotPasswordVerifyAccount}
                 title={isSubmitting ? <ActivityIndicator color="white" /> : 'Create new password'}
            disabled={isSubmitting || otp.includes('')} 
          />
        </View>

        {/* Resend Code Section */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t receive code?</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={isResendDisabled}>
            <Text style={[styles.resendLink, isResendDisabled && { color: 'gray' }]}>Resend code</Text>
          </TouchableOpacity>
        </View>

        {/* Timer */}
        {isResendDisabled && (
          <Text style={styles.timerText}>Resend code in 00:{timer < 10 ? `0${timer}` : timer}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {

    paddingLeft:19,
    paddingRight:17
  },
  description: {
    marginTop: theme.verticalSpacing.space_20,
    width: theme.horizontalSpacing.space_370,
    fontSize: theme.fontSizes.size_16,
    color: '#3D3D3D',
    marginVertical: 20,
    fontWeight: '400',
    lineHeight: 22,
  },
  email: {
    fontWeight: 'bold',
    color: theme.lightColor.borderColor,
  },
  otpContainer: {
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent:'space-between',
    marginTop: theme.verticalSpacing.space_114,
  },
  otpInput: {
    
    width: theme.horizontalSpacing.space_60,
    height: theme.verticalSpacing.space_60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    textAlign: 'center',
    fontSize: theme.fontSizes.size_18,
    backgroundColor: theme.lightColor.whiteColor,
  },
  resendContainer: {
    flexDirection: 'row',
    
    marginTop: 20,
  },
  resendText: {
    color: '#3D3D3D',
    fontSize: 14,
  },
  resendLink: {
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
  timerText: {
    
    color: '#3D3D3D',
  },
   errorText: {
    color: 'red',
    fontSize:theme.fontSizes.size_16,
    marginTop:10
  },
});

export default OtpScreen;
