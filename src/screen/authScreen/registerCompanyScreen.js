import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from "../../assets/images/svg";
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";
import { useRegisterMutation } from "../../redux/apiSlice/authApiSlice";
import CustomModal from "../../reusableComponent/customModal/customModal";
import Loader from "../../reusableComponent/loader/loader";
import CountryPicker from "react-native-country-picker-modal";

const RegisterCompanyScreen = ({ navigation, route }) => {
  const { email, password, firstName, lastName, confirmPassword } = route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const [company, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+44");
  const [selectedCountry, setSelectedCountry] = useState("GB");
  const [errorMessage, setErrorMessage] = useState("");
  const [privacyError, setPrivacyError] = useState("");
 const [showModal, setShowModal] = useState(false);
  const countryPickerRef = useRef(null);

  const [registerApi, { isLoading, isSuccess, error }] = useRegisterMutation();

  const handleVerify = () => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      setErrorMessage("Please enter a valid 10 to 12-digit phone number.");
      return;
    }

    if (!isPrivacyChecked) {
      setPrivacyError("You must agree to the terms and privacy policy.");
      return;
    }

    setErrorMessage("");
    setPrivacyError("");

    registerApi({
      email,
      password,
      firstName,
      lastName,
      company,
      phoneNumber: `${countryCode}${phoneNumber}`,
      confirmPassword,
    });
  };

  const validatePhoneNumber = (number) => /^[0-9]{10,12}$/.test(number);
  useEffect(() => {
    if (error) {
      setErrorMessage(error?.data?.message || "An error occurred during registration.");
    }

    if (isSuccess) {
      setModalVisible(true);
    }
  }, [isSuccess, error]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <View style={styles.container}>
        <CustomModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          title="Email verification code sent!"
          description="A 4-digit email verification code has been sent to your email. Please check your inbox or spam folder to confirm your account."
          buttons={[
            {
              label: "Continue",
              type: "primary",
              onPress: () => {
                setModalVisible(false);
                navigation.navigate(MainRoutes.EMAIL_VERIFICATION_SCREEN, { email });
              },
            },
          ]}
        />

        <CustomHeader leftIcon={<Svg.ArrowBack />} title="Getting Started" subtitle="Let’s create your free account here" />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Company name (Optional)</Text>
          <CustomTextInput value={company} onChangeText={setCompanyName} placeholder="Enter your company name" />

          <Text style={styles.label}>Phone number</Text>
          <View style={styles.phoneContainer}>
          
            <View style={{height:theme.verticalSpacing.space_50,borderWidth:1,borderRadius:8,alignItems:'center',justifyContent:"center",backgroundColor:'#FFF',padding:5,marginTop:5,marginRight:-5,borderColor:theme.lightColor.borderColor,paddingHorizontal:10}}>
          <TouchableOpacity onPress={() => setShowModal(true)} style={{}}>
        <Text style={{ fontSize:theme.fontSizes.size_16, color: '#000', fontWeight: '400',alignItems:"center",justifyContent:"center" }}>
          {countryCode}
        </Text>
      </TouchableOpacity>
           
            <CountryPicker
        ref={countryPickerRef}
        withCallingCode
        withFlag
        onSelect={(country) => {
          setCountryCode(`+${country.callingCode?.[0] || '1'}`);
          setSelectedCountry(country.cca2);
          setShowModal(false);
        }}
        countryCode={selectedCountry}
        visible={showModal}
        onClose={() => setShowModal(false)}
        renderFlagButton={() => null} 
      />
            </View>
            <CustomTextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              placeholder="Enter phone number"
              style={styles.phoneInput}
              maxLength={12}
            />
          </View>

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
           <View style={{marginTop:theme.verticalSpacing.space_10}}>
          <CustomCheckbox
            isChecked={isPrivacyChecked}
            onPress={() => setPrivacyChecked(!isPrivacyChecked)}
            text="By creating an account, you agree to the "
            linkText="Terms and Conditions*"
            link="https://drive.google.com/file/d/1SM4uLLNnwWuO4GNiBWIjCN_p0JMB1DOa/view?usp=drive_link"
            linkText2="Privacy Policy*"
            link2="https://your-privacy-policy-link.com"
            showAndText={true}
          />
      </View>
          {privacyError && <Text style={styles.errorText}>{privacyError}</Text>}

          <View style={styles.footer}>
            <CustomButton onPress={handleVerify} title="Create account" />
          </View>
        </View>

        {isLoading && <Loader isLoading={isLoading} />}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 19, flex: 1 },
  inputContainer: { marginTop: theme.verticalSpacing.space_40 },
  label: { marginTop: 20, fontWeight: "400", fontSize: 16 },
  phoneContainer: { flexDirection: "row", alignItems: "center" },
  phoneInput: { flex: 1, marginLeft: 10 },
  footer: { marginTop: 50, alignItems: "center" },
  errorText: { color: "red", fontSize: 14, marginTop: 5 },
  noFlagContainer: { paddingHorizontal: 10, height: 50, justifyContent: "center" },
});

export default RegisterCompanyScreen;