import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screen/authScreen/loginScreen';
import RegisterScreen from '../../screen/authScreen/registerScreen';
import RegisterCompanyScreen from '../../screen/authScreen/registerCompanyScreen';
import CreateNewPassword from '../../screen/authScreen/createNewPassword';
import ForgotPasswordScreen from '../../screen/authScreen/forgotPasswordScreen';
import OtpScreen from '../../screen/authScreen/otpScreen';
import WelcomeScreen from '../../screen/registerLoginScree/welcomeScreen';
import EmailVerificationScreen from '../../screen/authScreen/emailVerification';
import AccountVerifiedScreen from '../../screen/authScreen/accountVerifiedScreen';
import PasswordChnageSuccessFullyScreen from '../../screen/authScreen/passwordChangeSuccessfullyScreen';
import { MainRoutes } from '../routeAndParamsList';

const AuthStack = () => {
  const Stack = createStackNavigator(); 
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name={MainRoutes?.WELCOME_SCREEN} 
        component={WelcomeScreen} 
      />
      <Stack.Screen 
        name={MainRoutes?.LOGIN_SCREEN} 
        component={LoginScreen} 
      />
      <Stack.Screen 
        name={MainRoutes?.REGISTER_SCREEN} 
        component={RegisterScreen} 
      />
      <Stack.Screen 
        name={MainRoutes?.REGISTER_COMPANY_SCREEN} 
        component={RegisterCompanyScreen} 
      />
      <Stack.Screen 
        name={MainRoutes?.FORGOT_PASSWORD_SCREEN} 
        component={ForgotPasswordScreen} 
      />
      <Stack.Screen 
        name={MainRoutes?.CREATE_NEW_PASSWORD} 
        component={CreateNewPassword} 
      />
      <Stack.Screen 
        name={MainRoutes?.OTP_SCREEN} 
        component={OtpScreen} 
      />
      <Stack.Screen 
        name={MainRoutes?.EMAIL_VERIFICATION_SCREEN} 
        component={EmailVerificationScreen} 
      />
      <Stack.Screen 
        name={MainRoutes?.ACCOUNT_VERIFIED_SCREEN} 
        component={AccountVerifiedScreen} 
      />
       <Stack.Screen 
        name={MainRoutes?.CHANGE_PASSWORD_SUCCESSFULLY_SCREEN} 
        component={PasswordChnageSuccessFullyScreen} 
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
