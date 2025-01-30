import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from "../../asstets/images/svg";
import { theme } from "../../utils";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";
import { alertError, alertSuccess } from "../../utils/Toast";
import { useRegisterMutation } from "../../redux/apiSlice/authApiSlice";
import { useDispatch } from "react-redux";
import CustomModal from "../../reusableComponent/customModal/customModal";

const RegisterCompanyScreen = ({ navigation, route }) => {
  const { email, password, firstName, lastName, confirmPassword } = route.params || {};
 const [isModalVisible, setModalVisible] = useState(false);
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [company, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  const handleVerify = () => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      alertError("Invalid phone number", "Please enter a valid 10-digit phone number.");
      return;
    }
    if (isPrivacyChecked && isTermsChecked) {
      registerApi({email,password,firstName,lastName,company,phoneNumber,confirmPassword }).unwrap();
    } else {
      alertError("Please agree to both terms to continue.");
    }
  };


const closeModal = () => {
    setModalVisible(false);
  };


  const validatePhoneNumber = (number) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(number);
  };

  const [registerApi, { isLoading, isSuccess, error, data }] = useRegisterMutation();

  useEffect(() => {
    if (error) {
      alertError(error?.data?.message || "An error occurred during registration.");
    }

    if (isSuccess) {
        setModalVisible(true);
    }
  }, [isSuccess, error, data, dispatch, navigation]);

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>

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
                navigation.navigate(MainRoutes.EMAIL_VERIFICATION_SCREEN, { email });
              },
            },
          ]}
        />

        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Svg.ArrowBack />
          </TouchableOpacity>
          
        </View>
       <View style={{marginTop:theme.verticalSpacing.space_28,}}>
          <Text style={{fontSize:theme.fontSizes.size_30,fontWeight:'600',color: theme.lightColor.blackColor,}}>Register Account</Text>
       </View>
       
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={{fontWeight:'400',fontSize:theme.fontSizes.size_16}}>Company name (not required)</Text>
          <CustomTextInput
            value={company}
            onChangeText={(text) => setCompanyName(text)}
            placeholder={"Enter your company name"}
          />
          <Text style={styles.label}>Phone number</Text>
          <CustomTextInput
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="numeric"
            placeholder={"+44 (0) XXXX XXX XXX"}
          />
        </View>

        {/* Checkboxes */}
        <View style={styles.checkboxContainer}>
          <CustomCheckbox
            isChecked={isPrivacyChecked}
            onPress={() => setPrivacyChecked(!isPrivacyChecked)}
            text={"I have read and understood the"}
            linkText={"Privacy Policy*"}
            link="https://drive.google.com/file/d/1SM4uLLNnwWuO4GNiBWIjCN_p0JMB1DOa/view?usp=drive_link"
          />
          <CustomCheckbox
            isChecked={isTermsChecked}
            onPress={() => setTermsChecked(!isTermsChecked)}
            text={"I agree to the"}
            linkText={"Terms and Conditions*"}
            link="https://drive.google.com/file/d/1SM4uLLNnwWuO4GNiBWIjCN_p0JMB1DOa/view?usp=drive_link"
          />
        </View>

        {/* Verify Button */}
        <View style={styles.footer}>
          <CustomButton onPress={handleVerify} title={"Verify your account"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:19,
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
    marginBottom: theme.verticalSpacing.space_30,
   
    height: 50,
  },
  backIcon: {
    
    marginRight: 10,
  },
  headerTitle: {
    fontSize:theme.fontSizes.size_20,
    fontWeight: "600",
    color: theme.lightColor.blackColor,
  },
  inputContainer: {
    marginTop: theme.verticalSpacing.space_100,
    
  },
  label: {
    marginTop:theme.verticalSpacing.space_20,
    fontWeight:'400',fontSize:theme.fontSizes.size_16
  },
  checkboxContainer: {
    marginTop: theme.verticalSpacing.space_20,
   
  },
  footer: {
    marginTop: theme.verticalSpacing.space_50,
    alignItems: "center",
  },
});

export default RegisterCompanyScreen;
