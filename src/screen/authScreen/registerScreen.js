import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "../../utils";
import * as Svg from "../../assets/images/svg";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";

const RegisterScreen = ({ navigation }) => {
  const inputRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Error state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateInputs = () => {
    let newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    else if (firstName.length < 2) newErrors.firstName = "Must be at least 2 characters";

    if (!lastName) newErrors.lastName = "Last name is required";
    else if (lastName.length < 2) newErrors.lastName = "Must be at least 2 characters";

    if (!email) newErrors.email = "Email is required";
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email))
      newErrors.email = "Enter a valid Gmail address";

    if (!password) newErrors.password = "Password is required";
    else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password))
      newErrors.password = "Must be 8+ chars, include 1 uppercase & 1 special char.";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateInputs()) return;

    navigation.navigate(MainRoutes.REGISTER_COMPANY_SCREEN, {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.flexContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.flexContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              {/* Custom Header */}
              <CustomHeader
                leftIcon={<Svg.ArrowBack />}
                title={"Getting Started"}
                subtitle={"Let’s create your free account here"}
              />

              {/* Form Fields */}
              <View style={styles.nameView}>
                {/* Labels */}
                <View style={styles.row}>
                  <Text style={styles.label}>First name</Text>
                  <Text style={[styles.label, { marginLeft: theme.horizontalSpacing.space_10 }]}>
                    Last name
                  </Text>
                </View>

                {/* Inputs */}
                <View style={styles.row}>
                  <TextInput
                    ref={inputRef}
                    value={firstName}
                    onChangeText={(text) => {
                      setFirstName(text.replace(/\s/g, ""));
                      setErrors({ ...errors, firstName: "" });
                    }}
                    style={styles.nameTextInput}
                    placeholder="First name"
                    placeholderTextColor="#BABABA"
                  />
                  <TextInput
                    value={lastName}
                    onChangeText={(text) => {
                      setLastName(text.replace(/\s/g, ""));
                      setErrors({ ...errors, lastName: "" });
                    }}
                    style={[styles.nameTextInput, { marginLeft: 10 }]}
                    placeholder="Last name"
                    placeholderTextColor="#BABABA"
                  />
                </View>

                {/* Error Messages */}
                <View style={styles.row}>
                  {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                  {errors.lastName && (
                    <Text
                      style={[styles.errorText, { marginLeft: theme.horizontalSpacing.space_10 }]}
                    >
                      {errors.lastName}
                    </Text>
                  )}
                </View>

                <Text style={styles.TextStyle}>Enter your email address</Text>
                <CustomTextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors({ ...errors, email: "" });
                  }}
                  placeholder={"Enter your email address"}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <Text style={styles.TextStyle}>Password</Text>
                <CustomTextInput
                  textColor={theme.lightColor.blackColor}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors({ ...errors, password: "" });
                  }}
                  placeholder={"Password"}
                  rightIcon={<Svg.CloseEye />}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Text style={styles.TextStyle}>Confirm password</Text>
                <CustomTextInput
                  textColor={theme.lightColor.blackColor}
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors({ ...errors, confirmPassword: "" });
                  }}
                  placeholder={"Confirm password"}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Fixed Button - Stays at bottom */}
        {!isKeyboardVisible && (
          <View style={styles.buttonContainer}>
            <CustomButton onPress={handleRegister} title={"Continue"} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Prevents overlapping of button
  },
  container: {
    flex: 1,
    paddingHorizontal: 19,
  },
  nameView: {
    flex: 1,
    marginTop: theme.verticalSpacing.space_40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    flex: 1,
    textAlign: "left",
    color: theme.lightColor.blackColor,
  },
  nameTextInput: {
    flex: 1,
    height: theme.verticalSpacing.space_50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.lightColor.borderColor,
    paddingHorizontal: 15,
    backgroundColor: theme.lightColor.whiteColor,
    fontSize: theme.fontSizes.size_16,
    color:'black',
    marginTop:5
  },
  errorText: {
    color: "red",
    fontSize: theme.fontSizes.size_14,
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom:theme.verticalSpacing.space_40,
    paddingHorizontal: 19,
    alignSelf: "center",
    // backgroundColor: "white",
    paddingVertical: 10,
  },
  TextStyle: {
    marginTop: 20,
  },
});

export default RegisterScreen;
