import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../assets/images/svg';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import {
  useResendOtpForgotPasswordApiMutation,
  useVerifyOtpForgotPasswordMutation,
} from '../../redux/apiSlice/authApiSlice';
import CustomModal from '../../reusableComponent/customModal/customModal';

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');

  const intervalRef = useRef(null);
  const inputRef = useRef(null);

  const { email } = route.params || {};

  const [forgotPasswordVerifyOtp, { isSuccess, error, data }] =
    useVerifyOtpForgotPasswordMutation();
  const [resendOtp] = useResendOtpForgotPasswordApiMutation();

  const handleVerify = () => {
    if (otp.length < 4) return;
    setIsSubmitting(true);
    forgotPasswordVerifyOtp({ email, otp });
  };

  useEffect(() => {
    if (isSuccess && data?.success) {
      navigation.navigate(MainRoutes.CREATE_NEW_PASSWORD, { email });
    } else if (error || !data?.success) {
      const msg = error?.data?.message || 'Invalid OTP';
      setErrorText(msg);
    }
    setIsSubmitting(false);
  }, [isSuccess, data, error]);

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const handleResendCode = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true);
      setOtp('');
      setTimer(60);
      resendOtp({ email });
      setModalVisible(true);
    }
  };

  const closeModal = () => setModalVisible(false);

  const handleOtpChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, '').slice(0, 4);
    setOtp(numeric);
    if (numeric.length === 4) {
      handleVerify();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomModal
          visible={isModalVisible}
          onClose={closeModal}
          title="Code sent!"
          description="Code has been sent to your email, please check."
          buttons={[
            {
              label: 'Verify code',
              type: 'primary',
              onPress: closeModal,
            },
          ]}
        />

        <CustomHeader
          onBackPress={() => navigation.goBack()}
          leftIcon={<Svg.ArrowBack />}
          title={'Check your email'}
        />

        <Text style={styles.description}>
          We have sent a 4-digit code to your email{' '}
          <Text style={styles.email}>{email}</Text>. Please check your inbox and spam folder.
        </Text>

        <Text style={styles.instruction}>
          Please enter the code below to verify your account.
        </Text>

        {/* Hidden TextInput */}
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={4}
          autoFocus
        />

        {/* Custom OTP Display */}
        <View style={styles.otpBoxContainer}>
          {Array.from({ length: 4 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              style={styles.otpBox}
              onPress={() => inputRef.current?.focus()}
              activeOpacity={1}
            >
              <Text style={styles.otpText}>{otp[i] || ''}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

        <View style={{ marginTop: theme.verticalSpacing.space_114 }}>
          <CustomButton
            onPress={handleVerify}
            title={isSubmitting ? <ActivityIndicator color="#FFF" /> : 'Create new password'}
            disabled={isSubmitting || otp.length < 4}
          />
        </View>

        {/* Resend Section */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t receive code?</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={isResendDisabled}>
            <Text style={[styles.resendLink, isResendDisabled && { color: 'gray' }]}>
              {' '}
              Resend code
            </Text>
          </TouchableOpacity>
        </View>

        {isResendDisabled && (
          <Text style={styles.timerText}>Resend code in 00:{timer < 10 ? `0${timer}` : timer}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  description: {
    marginTop: 20,
    fontSize: theme.fontSizes.size_16,
    color: '#3D3D3D',
    lineHeight: 22,
    marginBottom: 10,
  },
  instruction: {
    fontSize: theme.fontSizes.size_16,
    color: '#3D3D3D',
    fontWeight: '400',
  },
  email: {
    fontWeight: 'bold',
    color: theme.lightColor.borderColor,
  },
  otpBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.verticalSpacing.space_114,
    position: 'relative',
  },
  otpBox: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.lightColor.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  otpText: {
    fontSize: theme.fontSizes.size_22,
    fontWeight: 'bold',
    color: '#000',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: 1,
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
    marginTop: 5,
    color: '#3D3D3D',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: theme.fontSizes.size_16,
  },
});

export default OtpScreen;
