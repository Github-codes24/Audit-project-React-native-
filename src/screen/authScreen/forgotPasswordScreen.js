import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg';
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
      alertError(
        "Forgot Password Error",
        forgotPasswordApiError?.data?.message || "Something went wrong. Please try again."
      );
    }
  }, [isForgotPasswordApiSuccess, forgotPasswordApiError]);

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ paddingHorizontal: 10 }}>
        <Loader isLoading={isForgotPasswordApiLoading} />
        <CustomModal
          visible={isModalVisible}
          onClose={closeModal}
          title="Code sent!"
          description={"Code has been sent to your email please check your email"}
          buttons={[
            {
              label: "Verify code",
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
                <View style={{marginTop:theme.verticalSpacing.space_28,paddingHorizontal:5}}>
                   <Text style={style.headerTitle}>Register Account</Text>
               </View>
        <Text style={style.Textstyle}>
          No worries! Enter your email address below and we will send you a code to reset password.
        </Text>
        <View style={style.inputView}>
          <Text>Email</Text>
          <CustomTextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder={'Enter your email address'}
          />
        </View>

        {/* Align the "Back to login" text on the same line */}
        <View style={style.forgetView}>
          <TouchableOpacity
            onPress={() => navigation.navigate(MainRoutes.LOGIN_SCREEN)}
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
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  forgetView: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginTop:5,
  },
  backToLoginText: {
    textAlign: 'right',
    paddingHorizontal:theme.horizontalSpacing.space_14,
    color: theme.lightColor.blackColor,
    fontWeight: '600',
  },
   backIcon: {
    paddingHorizontal:5,
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
    width:360,
    marginTop: theme.verticalSpacing.space_10,
    paddingHorizontal: 8,
    fontSize: theme.fontSizes.size_16,
    lineHeight: 20,
    letterSpacing:1,
    color:'black'
    
  },
  inputView: {
    marginTop: theme.verticalSpacing.space_100,
    padding: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: theme.verticalSpacing.space_156,
  },
});

export default ForgotPasswordScreen;
