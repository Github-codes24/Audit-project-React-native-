import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomHeader from '../../reusableComponent/customHeader/customHeader';
import * as Svg from '../../assets/images/svg';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import CustomModal from '../../reusableComponent/customModal/customModal';
import { useSelector, useDispatch } from 'react-redux';
import {
  useResendOtpForRegistrationPasswordApiMutation,
  useVerifyOtpForRegistrationMutation,
} from '../../redux/apiSlice/authApiSlice';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { getFcmToken } from '../../redux/stateSelector';

const EmailVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');
  const intervalRef = useRef(null);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const FcmToken = useSelector(getFcmToken);
  const { email } = route?.params || {};

  const [verifyOtp, { isLoading: verifyOtpApiLoading }] = useVerifyOtpForRegistrationMutation();
  const [ResendOtpRegistrationPasswordApi] = useResendOtpForRegistrationPasswordApiMutation();

  const handleVerifyAccount = async () => {
    if (otp.length !== 4) return;
    setIsSubmitting(true);
    setErrorText('');

    try {
      const result = await verifyOtp({ email, otp, fcmToken: FcmToken });
      if (result?.error) {
        setErrorText(result?.error?.data?.message || 'Invalid OTP. Please try again.');
      } else {
        navigation.navigate(MainRoutes?.ACCOUNT_VERIFIED_SCREEN, {
          verifyOtpApiData: result.data,
        });
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

  const handleResendCode = async () => {
    if (!isResendDisabled) {
      setModalVisible(true);
      setTimer(30);
      setIsResendDisabled(true);
      setOtp('');
      await ResendOtpRegistrationPasswordApi({ email });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ marginBottom: theme.verticalSpacing.space_100 }}
      >
        <View style={styles.container}>
          <CustomModal
            visible={isModalVisible}
            onClose={closeModal}
            title="Code resent!"
            description="A 4-digit code has been resent to your email, please check your inbox."
            buttons={[{ label: 'Verify code', type: 'primary', onPress: closeModal }]}
          />

          <CustomHeader
            onBackPress={() => navigation.goBack()}
            leftIcon={<Svg.ArrowBack />}
            title="Verify Your Email"
          />

          <Text style={styles.description}>
            We have sent a 4-digit code to your email{' '}
            <Text style={styles.email}>{email}</Text>. Please check your inbox and spam folder.
          </Text>

          <Text style={styles.instruction}>
            Please enter the code below to verify your account.
          </Text>

          <View style={styles.otpBoxContainer}>
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={otp}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
                setOtp(cleaned);
                if (cleaned.length === 4) {
                  handleVerifyAccount();
                }
              }}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={4}
              autoFocus
            />

            {Array.from({ length: 4 }).map((_, i) => (
              <TouchableOpacity
                key={i}
                style={styles.otpBox}
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
              >
                <Text style={styles.otpText}>{otp[i] || ''}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

          <View style={{ marginTop: theme.verticalSpacing.space_114 }}>
            <CustomButton
              onPress={handleVerifyAccount}
              title="Verify account"
              disabled={isSubmitting || otp.length !== 4}
            >
              {(isSubmitting || verifyOtpApiLoading) && <ActivityIndicator color="white" />}
            </CustomButton>
          </View>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn’t receive code?</Text>
            <TouchableOpacity onPress={handleResendCode} disabled={isResendDisabled}>
              <Text style={[styles.resendLink, isResendDisabled && { color: 'gray' }]}>
                {' '}
                Resend code
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.timerText}>
            Resend code in 00:{timer < 10 ? `0${timer}` : timer}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
  },
  description: {
    width: theme.horizontalSpacing.space_374,
    fontSize: theme.fontSizes.size_16,
    color: '#3D3D3D',
    fontWeight: '400',
    marginTop: theme.verticalSpacing.space_20,
    lineHeight: 22,
    marginVertical: 5,
  },
  email: {
    fontWeight: '400',
    color: theme.lightColor.brownColor,
    fontSize: theme.fontSizes.size_16,
  },
  instruction: {
    fontSize: theme.fontSizes.size_16,
    color: '#3D3D3D',
    marginTop: theme.verticalSpacing.space_10,
  },
  otpBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.verticalSpacing.space_114,
    position: 'relative',
  },
  otpBox: {
    width:theme.horizontalSpacing.space_70,
    height:theme.verticalSpacing.space_70,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.lightColor.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  otpText: {
    fontSize: theme.fontSizes.size_22,
    color: '#000',
    fontWeight: 'bold',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: theme.verticalSpacing.space_20,
  },
  resendText: {
    color: '#3D3D3D',
    fontSize: theme.fontSizes.size_16,
    fontWeight: '600',
  },
  resendLink: {
    color: '#6A1B9A',
    fontWeight: '600',
    fontSize: theme.fontSizes.size_16,
    marginLeft: 5,
  },
  timerText: {
    marginTop: 5,
    color: '#3D3D3D',
    fontSize: theme.fontSizes.size_16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: theme.fontSizes.size_16,
    marginTop: theme.verticalSpacing.space_10,
    marginLeft: 5,
  },
});

export default EmailVerificationScreen;
