import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../asstets/images/svg'
import BackgroundLayout from '../../reusableComponent/backgroundLayout/backgroundLayout';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { alertSuccess, ToastComponent } from '../../utils/Toast';
import { MainRoutes } from '../../navigation/routeAndParamsList';
const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Timer logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); 
    }
    return () => clearInterval(interval); 
  }, [timer]);

  
  const handleResendCode = () => {
     alertSuccess('send')
    if (!isResendDisabled) {
      setTimer(60); 
      setIsResendDisabled(true);  
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
      title={'Check your email'}
      />
       {/* <Text style={styles.heading}>Check Your Email</Text> */}
      <Text style={styles.description}>
        Code has been sent to <Text style={styles.email}>yourEmail@gmail.com</Text>. Please enter the code below.
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

      <View style={{marginTop:theme.verticalSpacing.space_80}}>
       <CustomButton
       onPress={()=>navigation.navigate(MainRoutes.CREATE_NEW_PASSWORD)}
       title={'Create New Password'}
       />
       </View>
      {/* Resend Code Section */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t Receive Code?</Text>
        <TouchableOpacity
         onPress={handleResendCode}
          disabled={isResendDisabled}
        >
          <Text style={[styles.resendLink, isResendDisabled && { color: 'gray' },]}> Resend Code</Text>
        </TouchableOpacity>
      </View>

      {/* Timer */}
      <Text style={styles.timerText}>Resend Code in 00:{timer < 10 ? `0${timer}` : timer}</Text>
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
    marginTop:50,
    paddingHorizontal:20,
    textAlign: 'center',
    fontSize: theme.fontSizes.size_14,
    color: '#3D3D3D',
    marginVertical: 20,
  },
  email: {
    fontWeight: 'bold',
    color:theme.lightColor.orangeColor,
  },
  otpContainer: {
    alignItems:"center",
    justifyContent:"center",
    flexDirection: 'row',
    marginTop:theme.verticalSpacing.space_80,
    // justifyContent: 'space-between',
    // marginTop: 20,
  },
  otpInput: {
    margin:5,
    width:theme.horizontalSpacing.space_60,
    height:theme.verticalSpacing.space_60,
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
    justifyContent: 'center',
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
    textAlign: 'center',
    marginTop: 10,
    color: '#3D3D3D',
  },
});

export default OtpScreen;
