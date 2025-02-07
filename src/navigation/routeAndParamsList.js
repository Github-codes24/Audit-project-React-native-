import { createStackNavigator } from '@react-navigation/stack';


export const MainRoutes = {
  // SPLASH_SCREEN: 'SplashScreen',
 
  WELCOME_SCREEN:'WelcomeScreen',
  CREATE_NEW_PASSWORD:'CreateNewPassword',
  FORGOT_PASSWORD_SCREEN:"ForgotPasswordScreen",
  LOGIN_SCREEN:'LoginScreen',
  REGISTER_SCREEN:'RegisterScreen',
  REGISTER_COMPANY_SCREEN:"RegisterCompanyScreen",
  OTP_SCREEN:'OtpScreen',
  EMAIL_VERIFICATION_SCREEN:"EmailVerificationScreen",
  ACCOUNT_VERIFIED_SCREEN:'AccountVerifiedScreen',
  DASHBOARD_SCREEN:"DashBoardScreen",
  ONBOARDING_SCREEN:'OnboardingScreen',
  CHANGE_PASSWORD_SUCCESSFULLY_SCREEN:"PasswordChnageSuccessFullyScreen",
  PROFILE_SCREEN:'ProfileScreen',
  DELETE_SCREEN:"DeleteScreen",
  REMAINDERLIST_SCREEN:"RemainderListScreen",
  EDITPROFILE_SCREEN:"EditProfile",
  EDITIMAGE_SCREEN:"EditImage",
  NOTIFICATION_SCREEN:"NotificationScreen",
  TERMANDCONDITION_SCREEN:"TermsAndConditionScreen",
  PRIVACYPOLICY_SCREEN:"PrivacyPolicyScreen",
  ABOUTUS_SCREEN:'AboutUsScreen',
  CONTACTUS_SCREEN:'ContactUsScreen',
  BLOG_DETAILS_SCREEN:"BlogDetailsScreen",
  SET_REMAINDER_SCREEN:"SetRemainderScreen",
  DELETE_SUCCESSFULLY:'DeleteSuccessFully',
  UPDATE_SUCCESSFULLY:'UpdateSuccessFully'
};

export const RootStackParamList = {
  // [MainRoutes.SPLASH_SCREEN]:{}| undefined,
   [MainRoutes.WELCOME_SCREEN]: {}|undefined,
   [MainRoutes.CREATE_NEW_PASSWORD]: {}|undefined,
[MainRoutes.FORGOT_PASSWORD_SCREEN]: {}|undefined,
  [MainRoutes.LOGIN_SCREEN]: {}|undefined,
 [MainRoutes.REGISTER_SCREEN]: {}|undefined,
 [MainRoutes.REGISTER_COMPANY_SCREEN]: {}|undefined,
  [MainRoutes.OTP_SCREEN]: {}|undefined,
  [MainRoutes.EMAIL_VERIFICATION_SCREEN]: {}|undefined,
  [MainRoutes.ACCOUNT_VERIFIED_SCREEN]: {}|undefined,
  [MainRoutes.DASHBOARD_SCREEN]: {}|undefined,
  [MainRoutes.ONBOARDING_SCREEN]: {}|undefined,
   [MainRoutes.CHANGE_PASSWORD_SUCCESSFULLY_SCREEN]: {}|undefined,
   [MainRoutes.PROFILE_SCREEN]: {}|undefined,
    [MainRoutes.DELETE_SCREEN]: {}|undefined,
   [MainRoutes.REMAINDERLIST_SCREEN]: {}|undefined,  
    [MainRoutes.NOTIFICATION_SCREEN]: {}|undefined,
    [MainRoutes.TERMANDCONDITION_SCREEN]: {}|undefined,
    [MainRoutes.PRIVACYPOLICY_SCREEN]: {}|undefined,
    [MainRoutes.EDITPROFILE_SCREEN]:{}|undefined,
   [MainRoutes.EDITIMAGE_SCREEN]:{}|undefined,
   [MainRoutes.ABOUTUS_SCREEN]:{}|undefined,
   [MainRoutes.BLOG_DETAILS_SCREEN]:{}|undefined,
  [MainRoutes.SET_REMAINDER_SCREEN]:{}|undefined,
  [MainRoutes.DELETE_SUCCESSFULLY]:{}|undefined,
   [MainRoutes.UPDATE_SUCCESSFULLY]:{}|undefined,

};

export const MainStack = createStackNavigator();
export const useNavType = {
  navigate: () => {}, 
};
