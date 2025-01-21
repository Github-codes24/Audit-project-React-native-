import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../asstets/images/svg'
import BackgroundLayout from '../../reusableComponent/backgroundLayout/backgroundLayout';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { alertSuccess, alertError } from '../../utils/Toast';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { useVerifyOtpForgotPasswordMutation } from '../../redux/apiSlice/authApiSlice';

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);  // Track submit state to prevent multiple submissions

  const { email } = route.params || {};
  
  const [forgotPasswordVerifyOtp, {
    isLoading: ForgotPasswordverifyOtpApiLoading,
    isSuccess: isForgotPasswordVerifyOtpApiSuccess,
    error: forgotPasswordVerifyOtpApiError,
    data: forgotPasswordVerifyOtpApiData,
  }] = useVerifyOtpForgotPasswordMutation();


console.log('forgotPasswordVerifyOtpApiData',forgotPasswordVerifyOtpApiData)


  function convertOtpToString(otpArray) {
    if (!Array.isArray(otpArray)) {
      throw new Error("Input must be an array");
    }
    return otpArray.join("");
  }

  const handleForgotPasswordVerifyAccount = () => {
    if (otp.includes('')) {
      alertError('Please enter the complete OTP');
      return;
    }

    let otpString = convertOtpToString(otp);
    console.log('otpString', otpString);

    setIsSubmitting(true);  

    forgotPasswordVerifyOtp({ email, otp: otpString });
  };

 useEffect(() => {
  if (isForgotPasswordVerifyOtpApiSuccess && forgotPasswordVerifyOtpApiData?.success) {
    alertSuccess('Success', 'OTP verification successful');
    navigation.navigate(MainRoutes.CREATE_NEW_PASSWORD, { email });
  } else if (forgotPasswordVerifyOtpApiError || !forgotPasswordVerifyOtpApiData?.success) {
    // alertError(forgotPasswordVerifyOtpApiError?.data.message)
  }
  setIsSubmitting(false); 
}, [
  isForgotPasswordVerifyOtpApiSuccess,
  forgotPasswordVerifyOtpApiData,
  forgotPasswordVerifyOtpApiError,
]);
  // useEffect(() => {
  //   let interval;
  //   if (timer > 0) {
  //     interval = setInterval(() => {
  //       setTimer(prevTimer => prevTimer - 1);
  //     }, 1000);
  //   } else {
  //     setIsResendDisabled(false);
  //   }
  //   return () => clearInterval(interval);
  // }, [timer]);

  const handleResendCode = () => {
    if (!isResendDisabled) {
      setTimer(60);
      setIsResendDisabled(true);
      alertSuccess('Code resent!');
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
    <View style={styles.container}>
      <CustomHeader
        onBackPress={() => navigation.goBack()}
        leftIcon={<Svg.ArrowBack />}
        title={'Check your email'}
      />
      <Text style={styles.description}>
        Code sent to <Text style={styles.email}>{email}</Text>. Please enter the code below.
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

      <View style={{ marginTop: theme.verticalSpacing.space_114 }}>
        <CustomButton
          textColor={'#BABABA'}
          onPress={handleForgotPasswordVerifyAccount}
          title={'Create New Password'}
          disabled={isSubmitting || otp.includes('')}  // Disable button if submitting or OTP is incomplete
        />
      </View>

      {/* Resend Code Section */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t Receive Code?</Text>
        <TouchableOpacity
          onPress={handleResendCode}
          disabled={isResendDisabled}
        >
          <Text style={[styles.resendLink, isResendDisabled && { color: 'gray' }]}> Resend Code</Text>
        </TouchableOpacity>
      </View>

      {/* Timer */}
      <Text style={styles.timerText}>Resend Code in 00:{timer < 10 ? `0${timer}` : timer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: theme.verticalSpacing.space_20,
    left: theme.horizontalSpacing.space_20,
  },
  backArrow: {
    fontSize: theme.fontSizes.size_24,
    color: '#000',
  },
  description: {
    marginTop: theme.verticalSpacing.space_10,
    paddingHorizontal: 20,
    width: theme.horizontalSpacing.space_370,
    fontSize: theme.fontSizes.size_14,
    color: '#3D3D3D',
    marginVertical: 20,
  },
  email: {
    fontWeight: 'bold',
    color: theme.lightColor.borderColor,
  },
  otpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.horizontalSpacing.space_20,
    marginTop: theme.verticalSpacing.space_100,
  },
  otpInput: {
    margin: 5,
    width: theme.horizontalSpacing.space_60,
    height: theme.verticalSpacing.space_60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    textAlign: 'center',
    fontSize: theme.fontSizes.size_18,
    backgroundColor: theme.lightColor.whiteColor,
  },
  submitButton: {
    marginTop: 30,
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
    flexDirection: 'row',
    paddingHorizontal: theme.horizontalSpacing.space_20,
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
    paddingHorizontal: theme.horizontalSpacing.space_20,
    color: '#3D3D3D',
  },
});

export default OtpScreen;
