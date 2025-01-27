import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../asstets/images/svg';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { alertSuccess, alertError } from '../../utils/Toast';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { useResendOtpForgotPasswordApiMutation, useVerifyOtpForgotPasswordMutation } from '../../redux/apiSlice/authApiSlice';
import { ScrollView } from 'react-native-gesture-handler';

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  const intervalRef = useRef(null);
  const inputs = []; 

  const { email } = route.params || {};

  const [forgotPasswordVerifyOtp, { isSuccess: isVerifySuccess, error: verifyError, data: verifyData }] = useVerifyOtpForgotPasswordMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResendOtpForgotPasswordApiMutation();

  const convertOtpToString = (otpArray) => otpArray.join("");

  const handleForgotPasswordVerifyAccount = () => {
    if (otp.includes('')) {
      alertError('Please enter the complete OTP');
      return;
    }

    const otpString = convertOtpToString(otp);
    setIsSubmitting(true);
    forgotPasswordVerifyOtp({ email, otp: otpString });
  };

  useEffect(() => {
    if (isVerifySuccess && verifyData?.success) {
      alertSuccess('Success', 'OTP verification successful');
      navigation.navigate(MainRoutes.CREATE_NEW_PASSWORD, { email });
    } else if (verifyError || !verifyData?.success) {
      alertError(verifyError?.data?.message || 'OTP verification failed');
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
    alertSuccess('Otp resend')
    if (!isResendDisabled) {
      setIsResendDisabled(true);
      setTimer(30);
      resendOtp({ email });
      alertSuccess('Code resend!');
    }
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
        <View style={{ paddingLeft: theme.horizontalSpacing.space_10 }}>
          <CustomHeader
            onBackPress={() => navigation.goBack()}
            leftIcon={<Svg.ArrowBack />}
            title={'Check your email'}
          />
        </View>
        <Text style={styles.description}>
          Code send to <Text style={styles.email}>{email}</Text>. Please enter the code below.
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
              ref={(ref) => (inputs[index] = ref)} // Store input references
            />
          ))}
        </View>

        <View style={{ marginTop: theme.verticalSpacing.space_114 }}>
          <CustomButton
            textColor={'#BABABA'}
            onPress={handleForgotPasswordVerifyAccount}
            title={'Create new password'}
            disabled={isSubmitting || otp.includes('')} // Disable if submitting or OTP incomplete
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
  container: {},
  description: {
    marginTop: theme.verticalSpacing.space_16,
    paddingHorizontal: 20,
    width: theme.horizontalSpacing.space_370,
    fontSize: theme.fontSizes.size_16,
    color: '#3D3D3D',
    marginVertical: 20,
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  email: {
    fontWeight: 'bold',
    color: theme.lightColor.borderColor,
  },
  otpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal:15,
    marginTop: theme.verticalSpacing.space_114,
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
  resendContainer: {
    flexDirection: 'row',
    paddingHorizontal:20,
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
