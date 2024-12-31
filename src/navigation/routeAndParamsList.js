import { createStackNavigator } from '@react-navigation/stack';


export const MainRoutes = {
  // SPLASH_SCREEN: 'SplashScreen',
 
  WELCOME_SCREEN:'WelcomeScreen',
  CREATE_NEW_PASSWORD:'CreateNewPassword',
  FORGOT_PASSWORD_SCREEN:"ForgotPasswordScreen",
  LOGIN_SCREEN:'LoginScreen',
  REGISTER_SCREEN:'RegisterScreen',
  REGISTER_COMPANY_SCREEN:"RegisterCompanyScreen",
};

export const RootStackParamList = {
  // [MainRoutes.SPLASH_SCREEN]:{}| undefined,
   [MainRoutes.WELCOME_SCREEN]: {}|undefined,
   [MainRoutes.CREATE_NEW_PASSWORD]: {}|undefined,
[MainRoutes.FORGOT_PASSWORD_SCREEN]: {}|undefined,
  [MainRoutes.LOGIN_SCREEN]: {}|undefined,
 [MainRoutes.REGISTER_SCREEN]: {}|undefined,
 [MainRoutes.REGISTER_COMPANY_SCREEN]: {}|undefined,
};

export const MainStack = createStackNavigator();
export const useNavType = {
  navigate: () => {}, 
};
