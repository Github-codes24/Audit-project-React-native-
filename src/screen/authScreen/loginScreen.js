import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import { String, theme } from "../../utils";
import * as Svg from "../../asstets/images/svg";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useLoginApiMutation } from "../../redux/apiSlice/authApiSlice";
import { alertError, alertSuccess } from "../../utils/Toast";

import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../reusableComponent/loader/loader";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";
import { setLoginResponse } from "../../redux/stateSlice/authStateSlice";


const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberChecked, setIsRememberChecked] = useState(false);

  const loginResponse = useSelector(getLoginResponse);

  const [loginApi, { 
    isLoading: isLoginApiLoading, 
    isSuccess: isLoginApiSuccess, 
    isError: isLoginApiError, 
    error: loginApiError, 
    data: loginApiData 
  }] = useLoginApiMutation();

  const handleSignIn = () => {
    loginApi({ email: email, password: password });
  };

  useEffect(() => {
    if (isLoginApiSuccess) {
      dispatch(setLoginResponse(loginApiData));
      alertSuccess("Success", "Login Successful");
    } else if (isLoginApiError) {
      console.log("loginApiError", loginApiError?.data?.message);
      alertError(loginApiError?.data?.message || "Invalid credentials, please try again.");
    }
  }, [isLoginApiSuccess, loginApiData, loginApiError]);

  return (
    <View style={{ backgroundColor: "#F2F3F5", paddingHorizontal:19}}>
      <Loader isLoading={isLoginApiLoading} message={"Please wait..."} />
      <StatusBar backgroundColor={"#F2F3F5"} />
      <CustomHeader
        onBackPress={() => navigation.goBack()}
        leftIcon={<Svg.ArrowBack />}
        title={"Login Here"}
      />
      <Text
        style={{
          width:374,
          marginTop: 5,
          fontWeight: "400",
          color: theme.lightColor.blackColor,
          
          marginTop:10,
          lineHeight:20
        }}
      >
        {"Welcome back you have been missed!"}
      </Text>
      <View style={style.LoginInputView}>
        <Text>Email</Text>
        <CustomTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder={"Enter your email address"}
        />
        <Text style={{ marginTop: 10 }}>Password</Text>
        <CustomTextInput
          textColor={"#BABABA"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder={".  .  .  .  ."}
        />
        <View style={style.rememberForgetContainer}>
          <CustomCheckbox
            isChecked={isRememberChecked}
            onPress={() => setIsRememberChecked(!isRememberChecked)}
            text={"Remember me"}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate(MainRoutes.FORGOT_PASSWORD_SCREEN)}
          >
            <Text style={style.forgetText}>{String.forgetPassword}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: theme.verticalSpacing.space_40 }}>
        <CustomButton onPress={handleSignIn} title={"Login"} />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          
          marginTop: theme.verticalSpacing.space_10,
        }}
      >
        <Text style={{ fontSize: theme.fontSizes.size_14, fontWeight: "400" }}>
          {"Don't have an account?"}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate(MainRoutes.REGISTER_SCREEN)}>
          <Text
            style={{
              fontSize: theme.fontSizes.size_14,
              fontWeight: "600",
              color: theme.lightColor.borderColor,
              marginLeft: 5,
            }}
          >
            {"Register now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  LoginInputView: {
    marginTop: theme.verticalSpacing.space_80,
    justifyContent: "center",
   
  },
  rememberForgetContainer: {
    flexDirection: "row", // Align horizontally
    justifyContent: "space-between", // Spread items across the row
    alignItems: "center", // Vertically center items
    marginTop:5, // Add top spacing
  },
  forgetText: {
    color: theme.lightColor.blackColor,
    fontWeight: "600",
    fontSize: theme.fontSizes.size_14, // Match font size for consistency
  },
});

export default LoginScreen;
