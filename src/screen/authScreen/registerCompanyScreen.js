import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from "../../asstets/images/svg";
import { theme } from "../../utils";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";
import { useRegisterMutation } from "../../redux/apiSlice/authApiSlice";
import { useDispatch } from "react-redux";
import CustomModal from "../../reusableComponent/customModal/customModal";
import Loader from "../../reusableComponent/loader/loader"; // Import loader component

const RegisterCompanyScreen = ({ navigation, route }) => {
  const { email, password, firstName, lastName, confirmPassword } = route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const [company, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const [privacyError, setPrivacyError] = useState(""); // State for privacy error

  const dispatch = useDispatch();

  const handleVerify = () => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      // Show error only if phone number is invalid
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!isPrivacyChecked) {
      setPrivacyError("You must agree to the terms and privacy policy checkbox.");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages
    setPrivacyError(""); // Clear privacy error message
    registerApi({ email, password, firstName, lastName, company, phoneNumber, confirmPassword }).unwrap();
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
      setErrorMessage(error?.data?.message || "An error occurred during registration.");
    }

    if (isSuccess) {
      setModalVisible(true);
    }
  }, [isSuccess, error, data, dispatch, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Modal for Success */}
        <CustomModal
          visible={isModalVisible}
          onClose={closeModal}
          title="Code sent!"
          description={"Code has been sent to your email. Please check your email."}
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

        <CustomHeader
          leftIcon={<Svg.ArrowBack />}
          title={'Getting Started'}
          subtitle={'Let’s create your free account here'}
        />

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "400", fontSize: theme.fontSizes.size_16 }}>Company name (Optional)</Text>
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

          {/* Error Message for Phone Number */}
          {phoneNumber && !validatePhoneNumber(phoneNumber) && (
            <Text style={styles.errorText}>Please enter a valid 10-digit phone number.</Text>
          )}

          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              isChecked={isPrivacyChecked}
              onPress={() => setPrivacyChecked(!isPrivacyChecked)}
              text={"By creating an account, you agree to the "}
              linkText={"Terms and Conditions*"}
              link="https://drive.google.com/file/d/1SM4uLLNnwWuO4GNiBWIjCN_p0JMB1DOa/view?usp=drive_link"
              linkText2={'Privacy Policy*'}
                link2="https://your-privacy-policy-link.com"
              showAndText={true}
            />
          </View>

          {/* Privacy Error Message */}
          {privacyError && <Text style={styles.errorText}>{privacyError}</Text>}

          <View style={styles.footer}>
            <CustomButton onPress={handleVerify} title={"Create account"} />
          </View>
        </View>

        {/* Loader */}
        {isLoading && <Loader isLoading={isLoading} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 19,
  },
  inputContainer: {
    marginTop: theme.verticalSpacing.space_40,
    height: "70%",
  },
  label: {
    marginTop: theme.verticalSpacing.space_20,
    fontWeight: "400",
    fontSize: theme.fontSizes.size_16,
  },
  checkboxContainer: {
    marginTop: theme.verticalSpacing.space_20,
  },
  footer: {
    marginTop: theme.verticalSpacing.space_50,
    alignItems: "center",
    position: 'absolute',
    bottom: theme.verticalSpacing.space_20,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: theme.fontSizes.size_14,
    marginTop: 5,
  },
});

export default RegisterCompanyScreen;
