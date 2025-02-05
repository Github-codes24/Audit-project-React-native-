import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { useResetPasswordApiMutation } from "../../redux/apiSlice/authApiSlice";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { alertError, alertSuccess } from "../../utils/Toast";

const CreateNewPassword = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { email } = route.params || {};

  const [
    resetPasswordApi,
    { isLoading: resetPasswordApiLoading, isSuccess: isResetPasswordApiSuccess, error: resetPasswordApiError },
  ] = useResetPasswordApiMutation();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("Must be at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("Must contain 1 uppercase letter");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Must contain 1 special character");

    return errors.length > 0 ? errors.join(", ") : "";
  };

  const handleResetPassword = () => {
    const newPasswordError = validatePassword(newPassword);
    const confirmPasswordError = newPassword !== confirmPassword ? "Passwords do not match" : "";

    if (newPasswordError || confirmPasswordError) {
      setErrors({ newPassword: newPasswordError, confirmPassword: confirmPasswordError });
      return;
    }

    resetPasswordApi({ email, newPassword, confirmPassword });
  };

  useEffect(() => {
    if (isResetPasswordApiSuccess) {
      alertSuccess("Success", "Password changed successfully.");
      navigation.navigate(MainRoutes.CHANGE_PASSWORD_SUCCESSFULLY_SCREEN);
    } else if (resetPasswordApiError) {
      alertError(resetPasswordApiError?.data?.message || "An error occurred. Please try again.");
    }
  }, [isResetPasswordApiSuccess, resetPasswordApiError]);

  return (
    <BackgroundLayout>
      <View style={styles.container}>
        <CustomHeader onBackPress={() => navigation.goBack()} title="Create New Password" />
        <Text style={styles.description}>
          Please enter and confirm your new  
        </Text>
        <Text style={{ fontSize: theme.fontSizes.size_16,
    lineHeight: 20,
    color: "black",
    fontWeight: "400",}}>{'password. You will need to log in after you'}</Text>
        <Text style={{ fontSize: theme.fontSizes.size_16,
    lineHeight: 20,
    color: "black",
    fontWeight: "400",}}>{'reset.'}</Text>
        <View style={styles.inputView}>
          <Text style={styles.label}>New Password</Text>
          <CustomTextInput
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              setErrors({ ...errors, newPassword: "" });
            }}
            placeholder="New password"
          />
          {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

          <Text style={styles.label}>Confirm Password</Text>
          <CustomTextInput
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors({ ...errors, confirmPassword: "" });
            }}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <View style={styles.buttonContainer}>
            <CustomButton onPress={handleResetPassword} title="Reset Password" disabled={resetPasswordApiLoading} />
          </View>
        </View>
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F3F5",
    height: "100%",
    paddingHorizontal: 19,
  },
  description: {
  
    marginTop: 20,
    fontSize: theme.fontSizes.size_16,
    lineHeight: 20,
    color: "black",
    fontWeight: "400",
  },
  inputView: {
    marginTop: theme.verticalSpacing.space_100,
  },
  label: {
    marginTop: 20,
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize:theme.fontSizes.size_14,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: theme.verticalSpacing.space_165,
  },
});

export default CreateNewPassword;
