import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { theme } from "../../utils";
import * as Svg from "../../asstets/images/svg";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { alertError } from "../../utils/Toast";
import { ScrollView } from "react-native-gesture-handler";

const RegisterScreen = ({ navigation }) => {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alertError("Missing Fields", "Please fill out all fields.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      alertError("Invalid email", "Please enter a valid Gmail address.");
      return;
    }

    if (password.length < 6) {
      alertError("Password too short", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alertError("Passwords don't match", "Please make sure both passwords are the same.");
      return;
    }

    navigation.navigate(MainRoutes.REGISTER_COMPANY_SCREEN, {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Svg.ArrowBack />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: theme.verticalSpacing.space_28, paddingHorizontal: 5 }}>
          <Text style={styles.headerTitle}>Register Account</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.nameView}>
          {/* Labels */}
          <View style={styles.row}>
            <Text style={styles.label}>First name</Text>
            <Text style={[styles.label,{marginLeft:theme.horizontalSpacing.space_10}]}>Last name</Text>
          </View>

          {/* Inputs */}
          <View style={styles.row}>
            <TextInput
              ref={inputRef}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={styles.nameTextInput}
              placeholder="John"
              placeholderTextColor="#BABABA"
            />
            <TextInput
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              style={[styles.nameTextInput, { marginLeft: 10 }]}
              placeholder="Weak"
              placeholderTextColor="#BABABA"
            />
          </View>

          <Text style={styles.TextStyle}>Enter your email address</Text>
          <CustomTextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder={"Enter your email address"}
          />
          <Text style={styles.TextStyle}>Password</Text>
          <CustomTextInput
            secureTextEntry={true}
            textColor={"#BABABA"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={"Password"}
            rightIcon={<Svg.CloseEye />}
          />
          <Text style={styles.TextStyle}>Confirm password</Text>
          <CustomTextInput
            secureTextEntry={true}
            textColor={"#BABABA"}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder={"Confirm password"}
          />
        </View>

        <View style={{ marginTop: theme.verticalSpacing.space_165 }}>
          <CustomButton onPress={handleRegister} title={"Continue"} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    marginBottom: 20,
  },
  backIcon: {
    paddingHorizontal: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: theme.fontSizes.size_30,
    fontWeight: "600",
    color: theme.lightColor.blackColor,
  },
  nameView: {
    marginTop: theme.verticalSpacing.space_80,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    flex: 1,
    textAlign: "left",
    // marginBottom: 10,
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
    letterSpacing: 1,
    fontSize:theme.fontSizes.size_16
  },
  TextStyle: {
    marginTop: 20,
  },
});

export default RegisterScreen;
