import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../assets/images/svg';
import BackgroundLayout from '../../reusableComponent/backgroundLayout/backgroundLayout';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { alertError, alertSuccess, ToastComponent } from '../../utils/Toast';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { useResendOtpForRegistrationPasswordApiMutation, useVerifyOtpForRegistrationMutation } from '../../redux/apiSlice/authApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getFcmToken } from '../../redux/stateSelector';
import CustomModal from '../../reusableComponent/customModal/customModal';

const EmailVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  const FcmToken = useSelector(getFcmToken);
  const { email } = route?.params || {};

  const convertOtpToString = (otpArray) => otpArray.join('');

  const [verifyOtp, { isLoading: verifyOtpApiLoading }] = useVerifyOtpForRegistrationMutation();

  const handleVerifyAccount = async () => {
    setIsSubmitting(true);
    setErrorText('');
    const otpString = convertOtpToString(otp);

    try {
      const result = await verifyOtp({ email, otp: otpString, fcmToken: FcmToken });
      if (result?.error) {
        setErrorText(result?.error?.data?.message || 'Invalid OTP. Please try again.');
      } else {
        navigation.navigate(MainRoutes?.ACCOUNT_VERIFIED_SCREEN, { verifyOtpApiData: result.data });
      }
    } catch (error) {
      setErrorText('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const [ResendOtpRegistrationPasswordApi] = useResendOtpForRegistrationPasswordApiMutation();

  const handleResendCode = async () => {
    if (!isResendDisabled) {
      setModalVisible(true);
      setTimer(30);
      setIsResendDisabled(true);
       setOtp(['', '', '', '']);
      await ResendOtpRegistrationPasswordApi({ email });
    }
  };

  const inputs = [];

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otp.length - 1) inputs[index + 1]?.focus();
    if (!text && index > 0) inputs[index - 1]?.focus();
  };

  return (
    <SafeAreaView>
      <ScrollView style={{marginBottom:theme.verticalSpacing.space_100}}>
      <View style={styles.container}>
        <CustomModal
          visible={isModalVisible}
          onClose={closeModal}
          title="Code resent!"
          description="A 4-digit code has been resent to your email, please check your inbox."
          buttons={[{ label: 'Verify code', type: 'primary', onPress: closeModal }]}
        />
        <CustomHeader onBackPress={() => navigation.goBack()} leftIcon={<Svg.ArrowBack />} title="Verify Your Email" />
        <Text style={styles.description}>
          We have sent a 4-digit code to your email <Text style={styles.email} >{email}</Text>. Please check your inbox and spam folder.
        </Text>
        <Text style={styles.instruction}>Please enter the code below to verify your account.</Text>



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
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
        <View  style={{marginTop:theme.verticalSpacing.space_114}}>
          <CustomButton onPress={handleVerifyAccount} title="Verify account" disabled={isSubmitting}>
            {(isSubmitting || verifyOtpApiLoading) ? <ActivityIndicator color="white" /> : null}
          </CustomButton>
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t receive code?</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={isResendDisabled}>
            <Text style={[styles.resendLink, isResendDisabled && { color: 'gray' }]}> Resend code</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timerText}>Resend code in 00:{timer < 10 ? `0${timer}` : timer}</Text>
      </View>
      </ScrollView>
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
    color:theme.lightColor.brownColor,
    fontSize:theme.fontSizes.size_16,
    
  },
  otpContainer: {
    alignItems:"center",
    justifyContent:'space-between',
    flexDirection: 'row',
    // marginTop:theme.verticalSpacing.space_40,
    
    // marginTop: 20,
  
    // backgroundColor:'red'
  },
  otpInput: {
  
    width:theme.horizontalSpacing.space_70,
    height:theme.verticalSpacing.space_70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor:theme.lightColor.borderColor,
    textAlign: 'center',
    fontSize: theme.fontSizes.size_22,
    backgroundColor:"white",
     marginTop:theme.verticalSpacing.space_114
   
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
  errorText: {
    color: 'red',
    fontSize:theme.fontSizes.size_16,
    marginTop:theme.verticalSpacing.space_10,
    marginLeft:5
  },
});


export default EmailVerificationScreen;
