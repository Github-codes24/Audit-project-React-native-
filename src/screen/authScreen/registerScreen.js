import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { theme } from "../../utils";
import * as Svg from "../../asstets/images/svg";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { alertError } from "../../utils/Toast";

const RegisterScreen = ({ navigation }) => {
  const inputRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error state
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};

    if (!firstName) {
      newErrors.firstName = "First name is required";
    } else if (firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailPattern.test(email)) newErrors.email = "Enter a valid email address";
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordPattern.test(password)) {
      newErrors.password = "Password must be 8+ chars, include 1 uppercase & 1 special char.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

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
    <ScrollView>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Svg.ArrowBack />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: theme.verticalSpacing.space_28 }}>
          <Text style={styles.headerTitle}>Register Account</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.nameView}>
          {/* Labels */}
          <View style={styles.row}>
            <Text style={styles.label}>First name</Text>
            <Text style={[styles.label, { marginLeft: theme.horizontalSpacing.space_10 }]}>Last name</Text>
          </View>

          {/* Inputs */}
          <View style={styles.row}>
            <TextInput
              ref={inputRef}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setErrors({ ...errors, firstName: "" });
              }}
              style={styles.nameTextInput}
              placeholder="First name"
              placeholderTextColor="#BABABA"
            />
            <TextInput
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                setErrors({ ...errors, lastName: "" });
              }}
              style={[styles.nameTextInput, { marginLeft: 10 }]}
              placeholder="Last name"
              placeholderTextColor="#BABABA"
            />
          </View>

          {/* Error Messages */}
          <View style={{flexDirection:'row'}}>
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
            {errors.lastName && <Text style={[styles.errorText,{marginLeft:theme.horizontalSpacing.space_10}]}>{errors.lastName}</Text>}
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
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: "" });
            }}
            placeholder={"Password"}
            rightIcon={<Svg.CloseEye />}
          />
          {errors.password && <Text style={[styles.errorText,{width:'100%'}]}>{errors.password}</Text>}

          <Text style={styles.TextStyle}>Confirm password</Text>
          <CustomTextInput
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors({ ...errors, confirmPassword: "" });
            }}
            placeholder={"Confirm password"}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
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
    paddingHorizontal: 19,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height:theme.verticalSpacing.space_50,
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: theme.fontSizes.size_30,
    fontWeight: "600",
    color: theme.lightColor.blackColor,
  },
  nameView: {
    marginTop: theme.verticalSpacing.space_80,
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
  },
  TextStyle: {
    marginTop: 20,
  },
  errorText: {
    width: theme.horizontalSpacing.space_187,
    color: "red",
    fontSize: theme.fontSizes.size_14,
    marginTop: 5,
  },
});

export default RegisterScreen;
