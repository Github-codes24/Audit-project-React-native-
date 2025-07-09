import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { theme } from "../../utils";
import * as Svg from "../../assets/images/svg";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    else if (firstName.length < 2) newErrors.firstName = "Must be at least 2 characters";

    if (!lastName) newErrors.lastName = "Last name is required";
    else if (lastName.length < 2) newErrors.lastName = "Must be at least 2 characters";

    if (!email) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password))
      newErrors.password = "Must be 8+ chars, include 1 uppercase & 1 special char.";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

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
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flex}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <CustomHeader
                leftIcon={<Svg.ArrowBack />}
                title="Getting Started"
                subtitle="Let’s create your free account here"
              />

              <View style={styles.nameView}>
                <View style={styles.row}>
                  <Text style={styles.label}>First name</Text>
                  <Text style={[styles.label, { marginLeft: theme.horizontalSpacing.space_10 }]}>
                    Last name
                  </Text>
                </View>

                <View style={styles.row}>
                  <TextInput
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
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors({ ...errors, email: "" });
                  }}
                  style={styles.nameTextInput}
                  placeholder="Enter your email address"
                  placeholderTextColor="#BABABA"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <Text style={styles.TextStyle}>Password</Text>
                <TextInput
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors({ ...errors, password: "" });
                  }}
                  style={styles.nameTextInput}
                  placeholder="Password"
                  placeholderTextColor="#BABABA"
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Text style={styles.TextStyle}>Confirm password</Text>
                <TextInput
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors({ ...errors, confirmPassword: "" });
                  }}
                  style={styles.nameTextInput}
                  placeholder="Confirm password"
                  placeholderTextColor="#BABABA"
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            </View>
          </KeyboardAwareScrollView>

          {/* Fixed bottom button */}
          <View style={styles.buttonFixed}>
            <CustomButton onPress={handleRegister} title="Continue" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.lightColor.backgroundColor || "#F0F0F0",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 160, // leaves space for the fixed button
  },
  container: {
    paddingHorizontal: 19,
  },
  nameView: {
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
    color: "black",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: theme.fontSizes.size_14,
    marginTop: 5,
    marginLeft: 5,
    flex: 1,
  },
  TextStyle: {
    marginTop: theme.verticalSpacing.space_20,
  },
  buttonFixed: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default RegisterScreen;
