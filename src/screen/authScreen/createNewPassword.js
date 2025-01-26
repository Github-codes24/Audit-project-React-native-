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

  const { email } = route.params || {};

  const [
    resetPasswordApi,
    {
      isLoading: resetPasswordApiLoading,
      isSuccess: isResetPasswordApiSuccess,
      error: resetPasswordApiError,
      data: resetPasswordpApiData,
    },
  ] = useResetPasswordApiMutation();

  const handleResetPassword = () => {
    if (newPassword.length < 6 || confirmPassword.length < 6) {
      alertError("Password must have at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alertError("Passwords do not match. Please try again.");
      return;
    }

    resetPasswordApi({ email, newPassword, confirmPassword });
  };

  useEffect(() => {
    if (isResetPasswordApiSuccess) {
      alertSuccess("Success", "Password changed successfully.");
      navigation.navigate(MainRoutes?.CHANGE_PASSWORD_SUCCESSFULLY_SCREEN);
    } else if (resetPasswordApiError) {
      console.log("resetPasswordApiError", resetPasswordApiError.data?.message);
      alertError(
        resetPasswordApiError?.data?.message || "An error occurred. Please try again."
      );
    }
  }, [isResetPasswordApiSuccess, resetPasswordApiError, resetPasswordpApiData]);

  return (
    <BackgroundLayout>
      <View style={{ backgroundColor: "#F2F3F5", height: "100%" }}>
        <CustomHeader
          onBackPress={() => navigation.goBack()}
          title={"Create New Password"}
        />
        <Text style={styles.description}>
          Please enter and confirm your new password. You will need to log in after you reset.
        </Text>
        <View style={styles.inputView}>
          <Text>New Password</Text>
          <CustomTextInput
            secureTextEntry={true}
            value={newPassword}
            textColor={"#BABABA"}
            onChangeText={(text) => setNewPassword(text)}
            placeholder={"New password"}
          />
          <Text style={styles.hintText}>Must have at least 6 characters.</Text>
          <Text style={styles.label}>Confirm Password</Text>
          <CustomTextInput
            secureTextEntry={true}
            textColor={"#BABABA"}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder={"Confirm password"}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={handleResetPassword}
              title={"Reset Password"}
              disabled={resetPasswordApiLoading}
            />
          </View>
        </View>
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  description: {
    width: 290,
    marginTop: 10,
    paddingHorizontal: theme.horizontalSpacing.space_10,
    lineHeight: 20,
    color: "#475569",
  },
  inputView: {
    marginTop: theme.verticalSpacing.space_100,
    padding: 10,
  },
  hintText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#A0A0A0",
  },
  label: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    marginTop: theme.verticalSpacing.space_165,
  },
});

export default CreateNewPassword;
