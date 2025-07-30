import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,ScrollView } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../assets/images/svg';
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";
import { useForgotPasswordApiMutation } from "../../redux/apiSlice/authApiSlice";
import { alertError } from "../../utils/Toast";
import CustomModal from "../../reusableComponent/customModal/customModal";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../reusableComponent/loader/loader";


const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const [
    forgotPasswordApi, {
      isLoading: isForgotPasswordApiLoading,
      isSuccess: isForgotPasswordApiSuccess,
      error: forgotPasswordApiError,
      data: forgotPasswordApiData,
    }
  ] = useForgotPasswordApiMutation();

  const handleNext = () => {
    forgotPasswordApi({ email });
  };

  useEffect(() => {
    if (isForgotPasswordApiSuccess) {
      setModalVisible(true);
    } else if (forgotPasswordApiError) {

      console.log('forgotPasswordApiError',forgotPasswordApiError)
      // alertError(
      //   "Forgot Password Error",
      //   forgotPasswordApiError?.data?.message || "Something went wrong. Please try again."
      // );
    }
  }, [isForgotPasswordApiSuccess, forgotPasswordApiError]);

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
      <View style={{ paddingHorizontal: 19 }}>
        <Loader isLoading={isForgotPasswordApiLoading} />
        <CustomModal
          visible={isModalVisible}
          onClose={closeModal}
          title="Email verification code sent!"
          description={"A 4-digit email verification code has been sent to your email. Please check your inbox or spam folder to confirm your account."}
          buttons={[
            {
              label: "Continue",
              type: "primary",
              onPress: () => {
                closeModal();
                navigation.navigate(MainRoutes.OTP_SCREEN, { email });
              },
            },
          ]}
        />
        
         <View style={style.header}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={style.backIcon}>
                    <Svg.ArrowBack />
                  </TouchableOpacity>
                 
                </View>
                <View style={{marginTop:theme.verticalSpacing.space_28,}}>
                   <Text style={style.headerTitle}>{'Forgot Password'}</Text>
               </View>
               <View style={{paddingRight:10,}}>
        <Text style={[style.Textstyle,{}]}>
          No worries! Enter your email address below  
        </Text>
        <Text style={[style.Textstyle,{marginTop:-8}]}>and we will send you a code to reset</Text>
        <Text style={[style.Textstyle,{marginTop:-8}]}>password.</Text>
        </View>
        <View style={style.inputView}>
          <Text style={{fontSize:theme.fontSizes.size_16,fontWeight:'400'}}>Email</Text>
          <CustomTextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder={'Enter your email address'}
            autoCapitalize="none"   
            autoCorrect={false}
          />
        </View>

        <View style={style.forgetView}>
          <TouchableOpacity
            onPress={() => navigation.navigate(MainRoutes?.LOGIN_SCREEN)}
          >
            <Text style={style.backToLoginText}>Back to login</Text>
          </TouchableOpacity>
        </View>

        {/* Reset password button */}
        
        <View style={style.buttonContainer}>
          <CustomButton
            onPress={handleNext}
            title={'Reset password'}
          />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  forgetView: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginTop:theme.verticalSpacing.space_20,
    height:theme.verticalSpacing.space_26, 
    // backgroundColor:'red'
  },
  backToLoginText: {
    textAlign: 'right',
   marginRight:theme.horizontalSpacing.space_10,
    color: theme.lightColor.blackColor,
    fontWeight: '600',
    fontSize:theme.fontSizes.size_16
  },
   backIcon: {  
    marginRight: 10,
  },
  headerTitle: {
    fontSize:theme.fontSizes.size_30,
    fontWeight: "600",
    color: theme.lightColor.blackColor,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    marginBottom: 20,
  },
  Textstyle: {
    marginTop: theme.verticalSpacing.space_10, 
    fontSize:theme.fontSizes.size_16, 
    color:'black',
    fontWeight:'400', 
    marginBottom: 8,
  },
  inputView: {
    marginTop: theme.verticalSpacing.space_100,  
  },
  buttonContainer: {
    width: '100%',
    marginTop:theme.verticalSpacing.space_100,
  },
});

export default ForgotPasswordScreen;
